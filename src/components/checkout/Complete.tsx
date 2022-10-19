import React from "react"

import {makeStyles} from "@material-ui/core/styles"
import {Container} from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles({
    container: {
        marginTop: "3rem",
        width: 480,
        maxWidth: "100%",
        textAlign: "center"
    },
    box: {
        marginTop: "1rem"
    },
    linkBtn: {
        textTransform: "none"
    }
})

// PayPayの支払いが完了したら遷移するページ
export const Complete: React.FC = () => {
    const classes = useStyles()

    return (
        <>
            <Container maxWidth="lg" className={classes.container}>
                <Typography variant="h5" gutterBottom>
                    Pay Pay Completed!
                </Typography>
                <Box className={classes.box}>
                    <Button
                        href="/"
                        variant="outlined"
                        color="primary"
                        className={classes.linkBtn}
                    >
                        Top
                    </Button>
                </Box>
            </Container>
        </>
    )
}