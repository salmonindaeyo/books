import { AxiosError, AxiosResponse } from "axios"
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { appAxios } from "@/core/libs/axios"

export type QueryKeyT = [string, object | undefined]

export const useDefaultError = () => {
  return (error: AxiosError<{ message?: string }>) => {
    const errorMassage =
      error.response?.data?.message || error.response?.data || error.message
    console.log(errorMassage)
    //do something
  }
}

export const fetcher = <T>({
  queryKey,
  headers,
  isDirectData = false
}): Promise<T> => {
  const [url, params] = queryKey
  return appAxios()
    .get(url, {
      params: { ...params },
      headers: headers
    })
    .then((res) => (isDirectData ? res.data : res.data.data))
}

export const useFetch = <T>(
  url: string | null,
  params?: object,
  config?: UseQueryOptions<T, Error, T, QueryKeyT> | null,
  headers?: object,
  isDirectData?: boolean
) => {
  return useQuery<T, Error, T, QueryKeyT>({
    ...config,
    queryKey: [url, params],
    queryFn: ({ queryKey }) => fetcher({ queryKey, headers, isDirectData })
  })
}

const useGenericMutation = <T, S>(
  func: (data: T | S) => Promise<AxiosResponse<S>>,
  config?
) => {
  return useMutation<AxiosResponse, AxiosError, T | S>({
    ...config,
    mutationFn: func,
    onError: useDefaultError()
  })
}

export const usePost = <T, S>(
  url: string,
  config?: UseQueryOptions<T, Error, T, QueryKeyT> & { headers?: object }
) => {
  return useGenericMutation<T, S>(
    (data) =>
      appAxios().post<S>(url, data, {
        headers: config?.headers
      }),
    {
      ...config,
      onError: useDefaultError()
    }
  )
}

export const usePut = <T, S>(
  url: string,
  config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
  return useGenericMutation<T, S>((data) => appAxios().put<S>(url, data), {
    ...config,
    onError: useDefaultError()
  })
}

export const usePatch = <T, S>(
  url: string,
  config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
  return useGenericMutation<T, S>((data) => appAxios().patch<S>(url, data), {
    ...config,
    onError: useDefaultError()
  })
}

export const useDelete = <T, S>(
  url: string,
  config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
  return useGenericMutation<T, S>(() => appAxios().delete<S>(url), {
    ...config,
    onError: useDefaultError()
  })
}
