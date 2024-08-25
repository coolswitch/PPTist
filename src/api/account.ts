import { postRequest, sendBeacon } from '@/api/request'

export function sendSms(phone: string) {
  return postRequest('/user/login/send/code', { phone })
}

export function loginBySms(phone: string, code: string) {
  return postRequest('/user/login/code/auth', { phone, code })
}
