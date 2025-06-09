"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {login, signUp} from "@/app/lib/auth";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})

export default function page() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        toast.promise(
            login(values.username, values.password),
            {
                loading: 'Authenticating user...',
                success: () => {
                    return `Successfully logged in!`;
                },
                error: (err) => `Error: ${err.message || 'Something went wrong'}`,
            }
        );
    }

    return (
        <div className="content-center min-h-screen">
            <Card className={`w-sm mx-auto`}>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardAction>
                        <Button variant="link"><a href={`/signup`}>Sign Up</a></Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({field}) => (
                                    <div>
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="whoami" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    </div>
                                )}/>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <div>
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="******" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    </div>
                                )}/>
                            <Button type="submit" className="w-1/3">Login</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
