import getConfig from 'next/config'
import { UseQueryOptions } from '@tanstack/react-query'
import { QueryKeyT, useDelete, useFetch, usePost , usePut} from './common/react_query'
import { Book } from '../domain/book.domain'

export function useBook() {
    return useFetch<Book[]>(`${process.env.NEXT_PUBLIC_URL_API}/api/books`,null,null,null,true)
  }

  export function useCreateBook( options?: UseQueryOptions<unknown, Error, unknown, QueryKeyT>) {
    return usePost(`${process.env.NEXT_PUBLIC_URL_API}/api/books`, options)
  }

  export function useUpdateBook( id: number, options?: UseQueryOptions<unknown, Error, unknown, QueryKeyT>) {
    return usePut(`${process.env.NEXT_PUBLIC_URL_API}/api/books/${id}`, options)
  }

  export function useDeleteBook( id: number) {
    return useDelete(`${process.env.NEXT_PUBLIC_URL_API}/api/books/${id}`)
  }

   
  