import getConfig from 'next/config'
import { UseQueryOptions } from '@tanstack/react-query'
import { QueryKeyT, useDelete, useFetch, usePost , usePut} from './common/react_query'
import { Book, Borrowing } from '../domain/book.domain'
import { History } from '../domain/borrow.domain'


  export function useBorrowing( options?: UseQueryOptions<unknown, Error, unknown, QueryKeyT>) {
    return usePost(`${process.env.NEXT_PUBLIC_URL_API}/api/borrowings`, options)
  }

  export function useBorrowingList() {
    return useFetch<Book[]>(`${process.env.NEXT_PUBLIC_URL_API}/api/borrowings/pending`,null,null,null,true)
  }

  export function useBorrowHistory() {
    return useFetch<History[]>(`${process.env.NEXT_PUBLIC_URL_API}/api/borrowings/history`,null,null,null,true)
  }


  export function useBorrowApprove( id: number, options?: UseQueryOptions<unknown, Error, unknown, QueryKeyT>) {
    return usePut(`${process.env.NEXT_PUBLIC_URL_API}/api/borrowings/${id}/approve`, options)
  }





   
  