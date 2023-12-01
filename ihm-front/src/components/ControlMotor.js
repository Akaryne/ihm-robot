import { Box, Paper, Typography, Button, TextField,Grid,Item,InputLabel, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis,ResponsiveContainer } from 'recharts';

const data = [{name: '1', uv: 400, pv: 800, amt: 2400},
{name: '2', uv: 200},
{name: '3', uv: 300},
{name: '4', uv: 250},
{name: '5', uv: 100},];




function ControlMotor({socket,dataSpeed}){

    const [speed, setSpeed] = useState("")
    const [mode, setMode] = useState(0)
    const [mouvementMotor,setMouvementMotor] = useState(0)
    const [variableAPI, setVariablAPI] = useState("")
    
    const setMotorSocket = () =>{
        socket.emit("helloworld",speed)
    }

    const handleModeMotor = (mode) => {
        setMode(mode)
        socket?.emit("robotMode",mode)    
    }

    const handleMouvementMotor = (mode) => {
        setMouvementMotor(mode)
        socket?.emit("commandRobot",mode)    
    }

    return(

        <>
            <Typography variant="h5" sx={{textAlign:"left",pb:1,mt:2}}>Interface de commande</Typography>
            
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={8}>
                    <Paper elevation={8} sx={{p:3,width:"100%",height:"50vh"}}>
                        <Typography variant="h5" sx={{textAlign:"center"}}>Courbe vitesse moteur</Typography>

                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" />
                                <XAxis dataKey="Speed" />
                                <YAxis />
                            </LineChart>
                        </ResponsiveContainer>

                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper elevation={8} sx={{p:2,width:"100%", height:"100%"}}>
                        <Typography variant="h5" sx={{textAlign:"center"}}>Commande moteur</Typography>

                        <InputLabel htmlFor="component-speed"><Typography variant="h6" color={"black"}>Vitesse</Typography></InputLabel>
                        <TextField fullWidth sx={{p:1}}
                            onChange={(event) => setSpeed(event.target.value)}
                            id="component-speed"
                            placeholder="speed between 0 - 1000"
                        ></TextField>
                        <Button variant="contained" sx={{width:"100%", p:1}}
                            onClick={setMotorSocket}
                        >Set speed</Button>

                            <Button variant="contained" disabled={mode === 1 ? false : true} 
                            color={mouvementMotor === 1 ? "success" : "primary"}
                            sx={{width:"100%", mt:4, p:1}}
                                onClick={()=>handleMouvementMotor(1)}
                            >Avant</Button>

                            <Box sx={{display:"flex", width:"100%"}}>
                                <Button variant="contained" disabled={mode === 1 ? false : true} 
                                color={mouvementMotor === 2 ? "success" : "primary"}
                                sx={{width:"50%",my:1, p:1, mr:1}}
                                    onClick={()=>handleMouvementMotor(2)}
                                >Gauche</Button>
                                <Button variant="contained" disabled={mode === 1 ? false : true} 
                                color={mouvementMotor === 3 ? "success" : "primary"}
                                sx={{width:"50%",my:1, p:1, ml:1}}
                                        onClick={()=>handleMouvementMotor(3)}
                                    >Droite</Button>
                            </Box>
                            <Button variant="contained" disabled={mode === 1 ? false : true} 
                            color={mouvementMotor === 4 ? "success" : "primary"}
                            sx={{width:"100%",my:1, p:1}}
                                    onClick={()=>handleMouvementMotor(4)}
                            >Arrière</Button>

                            <Button variant="contained" disabled={mode === 1 ? false : true} 
                            color={"error"}
                            sx={{width:"100%",my:1, p:1}}
                                    onClick={()=>handleMouvementMotor(0)}
                            >Arret</Button>

                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Paper elevation={8}>
                        <Toolbar sx={{display:"flex"}}>
                            <Grid container sx={{p:1}} spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="h5" sx={{textAlign:"center", mx:3}}>Choix des modes</Typography>       
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Button sx={{mx:1, width:"100%"}} onClick={()=>handleModeMotor(0)} color={mode === 0 ? "success" : "primary"} variant="contained">Mode Automatique</Button>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Button sx={{mx:1, width:"100%"}} onClick={()=>handleModeMotor(1)} color={mode === 1 ? "success" : "primary"}variant="contained">Mode Manuel</Button>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Button sx={{mx:1, width:"100%"}} onClick={()=>handleModeMotor(2)} color={mode === 2 ? "success" : "primary"} variant="contained">Mode Camera</Button>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Paper elevation={8} sx={{height:"25vh",overflow:"scroll",my:1,mb:2 }}>
                        <Toolbar sx={{display:"flex",justifyContent:"center"}}>
                        <Typography variant="h5" sx={{textAlign:"center", mx:3}}>Logs console</Typography>       
                        </Toolbar>
                        <Box sx={{height:"10vh",overflow:"scroll"}}>

                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        
           
            
        </>
    )
}export default ControlMotor