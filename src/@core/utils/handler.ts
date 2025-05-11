type TRequestHandler<T, X> = {
  function: (params: X) => T
  params: X
}

type TRequestHandlerResult<T> = [T | null, null | string]

export const requestHandler = async <T, X>(
  params: TRequestHandler<T, X>,
): Promise<TRequestHandlerResult<T>> => {
  const { function: requestFunction, params: requestParams } = params
  try {
    const data = await requestFunction(requestParams)

    return [data, null]
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'
    return [null, errorMessage]
  }
}
