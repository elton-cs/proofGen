// import { AccountUpdate, Bool, Field, Mina, PrivateKey, PublicKey, SmartContract, State, Struct, UInt64, isReady, method, state } from "snarkyjs";
// import { BountyContract } from "./BountyContract";

// describe('Add smart contract integration test', () => {
//     let feePayer: PrivateKey,
//         zkAppAddress: PublicKey,
//         zkAppPrivateKey: PrivateKey,
//         zkAppInstance: BountyContract,
//         currentState: Field,
//         txn;

//     beforeAll(async () => {
//         await isReady;
//         // setup local blockchain
//         let Local = Mina.LocalBlockchain();
//         Mina.setActiveInstance(Local);

//         // Local.testAccounts is an array of 10 test accounts that have been pre-filled with Mina
//         feePayer = Local.testAccounts[0].privateKey;

//         // zkapp account
//         zkAppPrivateKey = PrivateKey.random();
//         zkAppAddress = zkAppPrivateKey.toPublicKey();
//         zkAppInstance = new BountyContract(zkAppAddress);

//         // deploy zkapp
//         txn = await Mina.transaction(zkAppAddress, () => {
//             AccountUpdate.fundNewAccount(feePayer);
//             zkAppInstance.deploy({ zkappKey: zkAppPrivateKey });
//         });
//         await txn.send();
//     });

//     afterAll(async () => {
//         setTimeout(shutdown, 0);
//     });

//     it('sets intitial state of num to 1', async () => {
//         currentState = zkAppInstance.num.get();
//         expect(currentState).toEqual(Field(1));
//     });

//     it('correctly updates num from intial state to 3', async () => {
//         txn = await Mina.transaction(feePayer, () => {
//             zkAppInstance.update();
//             zkAppInstance.sign(zkAppPrivateKey);
//         });
//         txn.send();

//         currentState = zkAppInstance.num.get();
//         expect(currentState).toEqual(Field(3));
//     });
// });
