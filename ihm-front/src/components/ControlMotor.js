import { Box, Paper, Typography, Button, TextField,Grid,InputLabel, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis,ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import 'dayjs/locale/fr' // load on demand



function ControlMotor({socket,dataMotor,fulData}){

    const [speed, setSpeed] = useState("")
    const [mode, setMode] = useState(0)
    const [mouvementMotor,setMouvementMotor] = useState(0)
    const [log, setLog] = useState([])
    
    const setMotorSocket = () =>{
        
        console.log(typeof(speed), " ", speed.length , " valeur : ",speed )
        let newSpeed
        if(speed.length < 5){
            switch (speed.length){
                case 0:
                    newSpeed = "0000"
                    break
                    case 1:
                        newSpeed = `000${speed}`
                        break
                        case 2:
                            newSpeed = `00${speed}`
                            break
                            case 3:
                                newSpeed = `0${speed}`
                                break
                                default:
                                    newSpeed = speed
                                    break
            }
        }

        socket?.emit("setSpeed",newSpeed)
        if(socket){setLog(p=>[`${dayjs().format('HH:mm:ss')} : set speed : ${speed}`,...p]);}
        
    }

    const handleModeMotor = (mode) => {
        setMode(mode)
        let typeMouvement;
        switch(mode){
            case 1:
                typeMouvement = "Manuel"
                break
            case 2:
                typeMouvement = "Camera"
                break
            case 0:
                typeMouvement = "Automatique"
                break
            default:
                break
            }

        if(socket){setLog(p=>[`${dayjs().format('HH:mm:ss')} : Mode : ${typeMouvement}`,...p]);}
        socket?.emit("robotMode",mode)    
    }

    const handleMouvementMotor = (mode) => {
        setMouvementMotor(mode)
        let typeMouvement;
        switch(mode){
        case 1:
            typeMouvement = "Avant"
            break
        case 2:
            typeMouvement = "Gauche"
            break
        case 3:
            typeMouvement = "Droite"
            break
        case 4:
            typeMouvement = "Arrière"
            break
        case 0:
            typeMouvement = "Arrêt"
            break
        default:
            break
        }
        if(socket){setLog(p=>[`${dayjs().format('HH:mm:ss')} : Mouvement robot : ${typeMouvement}`,...p]);}
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
                            <LineChart data={dataMotor}>
                                <Line type="monotone" dataKey="speed" isAnimationActive={false} stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" />
                                <XAxis dataKey="Speed" />
                                <YAxis domain={[0, 1000]}/>
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
                    <Paper elevation={8} sx={{height:"25vh",my:1 }}>
                        <Toolbar variant ="dense" sx={{display:"flex",justifyContent:"center"}}>
                        <Typography variant="h5" sx={{textAlign:"center", mx:3}}>Logs console</Typography>       
                        </Toolbar>
                        <Box sx={{height:"17vh",px:1,overflow:"scroll"}}>
                            {log.map((elem)=>{
                                return(<Typography>{elem}</Typography>)
                            })}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        
           
            
        </>
    )
}export default ControlMotor