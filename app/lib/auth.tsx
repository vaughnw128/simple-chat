"use server"

import { cookies } from 'next/headers'

export async function signUp(username: string, password: string): Promise<{ ok: boolean, message: string }> {
    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')

    const request: RequestInfo = new Request('http://localhost:8080/api/signup', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({"username": username, "password": password}),
    })

    const res = await fetch(request)
    let response_json = await res.json()

    if (!res.ok) {
        throw new Error(response_json["error"])
    }

    const cookieStore = await cookies()
    cookieStore.set('access_token', response_json['access_token'], {httpOnly: true})

    return { ok: true, message: response_json["message"] }
}

export async function login(username: string, password: string): Promise<{ ok: boolean, message: string }> {
    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')

    const request: RequestInfo = new Request('http://localhost:8080/api/login', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({"username": username, "password": password}),
    })

    const res = await fetch(request)
    let response_json = await res.json()

    if (!res.ok) {
        throw new Error(response_json["error"])
    }

    const cookieStore = await cookies()
    cookieStore.set('access_token', response_json['access_token'], {httpOnly: true})

    return { ok: true, message: response_json["message"] }
}
