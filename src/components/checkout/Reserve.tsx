import React, {useState} from "react"

import {makeStyles} from "@material-ui/core/styles"
import {Container, Grid} from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import Slider from "@material-ui/core/Slider"
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import Link from "@material-ui/core/Link"

const useStyles = makeStyles({
    container: {
        marginTop: "3rem",
        width: 480,
        maxWidth: "100%"
    },
    input: {
        width: 42
    },
    submitBtn: {
        textTransform: "none"
    },
    box: {
        marginTop: "1rem"
    }
})

export const Reserve: React.FC = () => {
    const classes = useStyles()

    //支払い用URL
    const [paymentUrl, setPaymentUrl] = useState<string>("")
    // 金額（商品が1つしかないなら決め打ちでもいいが、今回はサンプルなので動的に変更できるように）
    const [amount, setAmount] = useState<number | string | Array<number | string>>(10)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSliderChange = (e: any, newAmount: number | number[]) => {
        setAmount(newAmount)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // parseInt: 文字列の引数を解析し、整数値を返す
        setAmount(parseInt(e.target.value))
    }

    const handleBlur = () => {
        if (amount < 0) {
            setAmount(0)
        } else if (amount > 100) {
            setAmount(100)
        }
    }
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await fetch("/.netlify/functions/paypay", {
                method: "POST",
                body: JSON.stringify({
                    amount: amount,
                    orderDescription: "Test Payment"
                }),
                headers: {"Content-Type": "application/json"}
            })

            const resJson = await res.json()

            if (resJson) {
                console.log(resJson.resultInfo)
                setPaymentUrl(resJson.data.url)
            }
        } catch (err) {
            console.log(err)
        }

        setIsLoading(false)
    }

    return (
        <>
        <Container maxWidth="lg" className={classes.container}>
            <Typography variant="h5" gutterBottom> React PayPay</Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        value={typeof amount === "number" ? amount : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                    />
                </Grid>
            </Grid>
            <Grid item>
                ¥
                <Input
                    className={classes.input}
                    value={amount}
                    margin="dense"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                        step: 1,
                        min: 0,
                        max: 100,
                        type: "number",
                        "aria-labelledby": "input-slider"
                    }}
                />
            </Grid>
            <Grid item>
                <Button
                    variant="outlined"
                    color="primary"
                    disabled={isLoading ? true : false}
                    onClick={handleSubmit}
                    className={classes.submitBtn}
                >
                    {isLoading ? "Generating..." : "Generate QR Code"}
                </Button>
            </Grid>
            <Box className={classes.box}>
                <Link
                    href={paymentUrl}
                    variant="body2"
                    target="_blank"
                >
                    {paymentUrl} {/* 支払い用URLが生成されたら表示 */}
                </Link>
            </Box>
        </Container>
</>
)
}

