import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useGetProfileQuery} from "../../modules/auth/quieries/useGetProfileQuery.ts";
import {Link, Outlet, useNavigate} from "react-router";
import {useAuthStore} from "../../modules/auth/store/auth.store.ts";
import {useQueryClient} from "@tanstack/react-query";

function MainLayout() {
    const navigate = useNavigate();
    const { data, isLoading } = useGetProfileQuery()
    const queryClient = useQueryClient()
    const { clearToken } = useAuthStore()
    const isLoggedIn = data && !isLoading

    function goProfilePage() {
        navigate("/profile")
    }

    async function handleLogout() {
        clearToken()
        setTimeout(() => {
            queryClient.resetQueries({ queryKey: ['auth/getProfile'] })
            // queryClient.invalidateQueries({ queryKey: ['auth/getProfile'] })
        }, 0)
    }

    return (
        <div>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Link style={{ textDecoration: 'none' }} to="/home"><Navbar.Brand>Home</Navbar.Brand></Link>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">

                        {isLoggedIn ? (
                            <Nav>
                                <NavDropdown
                                    id="nav-dropdown-dark-example"
                                    title={"Signed in as " + data?.name }
                                >
                                    <NavDropdown.Item onClick={goProfilePage}>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        ) : (
                            <Link to="/login"><Button variant="primary">Sign in</Button></Link>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <Outlet/>
            </Container>
        </div>
    );
}

export default MainLayout;