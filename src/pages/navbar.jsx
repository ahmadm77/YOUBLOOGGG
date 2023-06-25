import { Box } from "@chakra-ui/react"
import { NavbarStyle } from "../components/navbarStyle"
import { Outlet } from "react-router-dom"
import { Footer } from "../components/footer"

export const NavbarPage = () => {
    return (
        <Box>
            <NavbarStyle />
            <Outlet /> 
            <Footer />
            {/* outlet nerima semua path yg ada dichildren di app.js*/}
        </Box>
    )
}