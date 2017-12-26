import assert = require("assert");
import fs = require("fs");

import tracer = require("../src");

// nested functions helpers
const returnContext = () => compareContext(tracer.get());
const compareContext = firstContext => {
  const secondContext = tracer.get();

  return { firstContext, secondContext };
};

const trace = async fn =>
  new Promise<any>((resolve, reject) => {
    tracer.set(() => resolve(fn()));
  });

describe("context tracer", () => {
  it("should not be set", () => {
    assert.deepEqual(tracer.get(), "no context");
  });

  it("should run nested functions in same context", async () => {
    const firstTrace = await trace(returnContext);
    const secondTrace = await trace(returnContext);

    assert.deepEqual(firstTrace.firstContext, firstTrace.secondContext);
  });

  it("should provide different contexts - flat calls", async () => {
    const firstTrace = await trace(returnContext);
    const secondTrace = await trace(returnContext);

    assert.notDeepEqual(firstTrace.firstContext, secondTrace.firstContext);
  });

  it("should provide different contexts - nested calls", async () => {
    let deepTrace = "";
    let firstTrace = "";
    let secondTrace = "";

    await trace(async () => {
      firstTrace = tracer.get();
      await trace(() => {
        deepTrace = tracer.get();
      });
      secondTrace = tracer.get();
    });

    assert.deepEqual(firstTrace, secondTrace);
    assert.notDeepEqual(firstTrace, deepTrace);
  });
});
