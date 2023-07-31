import {
  AccountUpdate,
  Bool,
  Field,
  PublicKey,
  SmartContract,
  State,
  Struct,
  UInt64,
  method,
  state,
} from 'snarkyjs';

// bounty object struct
class Bounty extends Struct({
  // builder: PublicKey,
  tokenValue: UInt64,
  isOpen: Bool,
  unitTestHash: Field,
}) {}

export class BountyContract extends SmartContract {
  @state(Bounty) onChainBounty = State<Bounty>();

  init() {
    super.init();
    this.onChainBounty.set(
      new Bounty({
        tokenValue: UInt64.from(0),
        isOpen: Bool(false),
        unitTestHash: Field(0),
      })
    );
  }

  @method buildBountyTest(newBounty: Bounty) {
    const currentOnChainBountyState = this.onChainBounty.get();
    this.onChainBounty.assertEquals(currentOnChainBountyState);

    newBounty.tokenValue.assertGreaterThan(
      UInt64.from(0),
      'Cannot Create a Bounty with no MINA Tokens'
    );
    newBounty.unitTestHash.assertNotEquals(
      Field(0),
      'Provided an empty unit test hash'
    );
    newBounty.isOpen.assertEquals(Bool(true));

    let senderUpdate = AccountUpdate.create(this.sender);
    senderUpdate.requireSignature();
    senderUpdate.send({ to: this, amount: newBounty.tokenValue });

    this.onChainBounty.set(newBounty);
  }

  // @method submitBountySolution
}
