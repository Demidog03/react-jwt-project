import {Container, Form, Button} from "react-bootstrap";
import {type ChangeEvent, type FormEvent, useState} from "react";
import {useLoginMutation} from "../quieries/useLoginMutation.ts";
import {useAuthStore} from "../store/auth.store.ts";

interface LoginFormData {
    email: string;
    password: string;
}

function LoginPage() {
    const { isPending, mutate: login } = useLoginMutation()
    const { addToken } = useAuthStore()

    const [loginFormData, setLoginFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    })

    function handleChangeEmail(e: ChangeEvent<HTMLInputElement>): void {
        setLoginFormData({ ...loginFormData, email: e.target.value })
    }

    function handleChangePassword(e: ChangeEvent<HTMLInputElement>): void {
        setLoginFormData({ ...loginFormData, password: e.target.value })
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault()

        const email = loginFormData.email.trim()
        const password = loginFormData.password.trim()

        if (!email || !password) {
            alert('Please fill in all fields.');
            return
        }

        void login({
            email,
            password
        }, {
            onSuccess: (data) => {
                if (!data.accessToken) {
                    return
                }

                addToken(data.accessToken)
            }
        })
    }

    return (
        <Container fluid="sm" style={{ paddingTop: "50px" }}>
            <h2 style={{ textAlign: 'center' }}>Sign-in</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={loginFormData.email} onChange={handleChangeEmail} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={loginFormData.password} onChange={handleChangePassword} type="password" placeholder="Password" />
                </Form.Group>
                <Button disabled={isPending} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default LoginPage;