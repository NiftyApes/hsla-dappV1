function concatenateInputs(inputs: any[]) {
  let result = '';

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (input.type === 'tuple') {
      result += `(${concatenateInputs(input.components)})`;
    } else {
      result += `${input.internalType}`;
    }

    if (i !== inputs.length - 1) {
      result += ',';
    }
  }

  return result;
}

export function getEventSignatureFromAbi({ eventName, abi }: any) {
  const abiEvent = abi.find(
    (abiObj: any) => abiObj.type === 'event' && abiObj.name === eventName,
  );

  const eventSig = `${abiEvent.name}(${concatenateInputs(abiEvent.inputs)})`;

  return eventSig;
}
