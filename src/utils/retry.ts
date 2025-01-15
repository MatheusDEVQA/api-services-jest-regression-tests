export async function retryRequest<T>(
    requestFunction: () => Promise<T>,
    condition: (response: T) => boolean,
    maxRetries: number = 10,
  ): Promise<T> {
    let response: T | undefined;
    let retries = 0;
  
    while (retries < maxRetries) {
      response = await requestFunction();
      if (condition(response)) {
        return response;
      }
      retries++;
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
    }
  
    if (response === undefined) {
      throw new Error('Maximum retries reached without receiving a response.');
    }
  
    return response;
  }