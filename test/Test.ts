import assert from "assert";
import { 
  TestHelpers,
  GnosisToken_Transfer
} from "generated";
const { MockDb, GnosisToken } = TestHelpers;

describe("GnosisToken contract Transfer event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for GnosisToken contract Transfer event
  const event = GnosisToken.Transfer.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("GnosisToken_Transfer is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await GnosisToken.Transfer.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualGnosisTokenTransfer = mockDbUpdated.entities.GnosisToken_Transfer.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedGnosisTokenTransfer: GnosisToken_Transfer = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      from: event.params.from,
      to: event.params.to,
      value: event.params.value,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualGnosisTokenTransfer, expectedGnosisTokenTransfer, "Actual GnosisTokenTransfer should be the same as the expectedGnosisTokenTransfer");
  });
});
