import { UseQueryOptions } from '@tanstack/react-query'
import { QueryKeyT, useDelete, useFetch, usePost, usePut } from './common/react_query'
import { LoginBody, LoginResponse } from '../domain/auth.domain'

export function useLogin() {
  return usePost<{ data: LoginResponse }, LoginBody>(`${process.env.NEXT_PUBLIC_URL_API}/api/auth/login`)
}



