import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useRef } from 'react';
import "./flowchart.css"
import {memory} from "./Meomory.js"

function FlowChart() {
    
    const refA = useRef("null");
    const refB = useRef("null");
    const refIr = useRef("null");
    const refRAM = useRef("null");
    const refROM = useRef("null");
    const refMAR = useRef(0);
    const refPC = useRef(0);
    const refTemp = useRef("null");

    const [a, setA] = useState("");
    const [b, setB] = useState("");

    function colorGreen(ref) 
    {
        ref.current.style.backgroundColor = 'rgba(0, 128, 0, 0.568)';
        ref.current.style.color = 'white';
    }
    function colorWhite(ref)
    {
        ref.current.style.backgroundColor = 'transparent';
        ref.current.style.color = 'black';
    }

    function delay(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function t1_t2_t3(name)
    {
                refROM.current.value="T0: PC(E), MAR(E,L)\n";
                colorGreen(refPC);
                await delay(1000);
                colorWhite(refPC);
                colorGreen(refMAR);
                refMAR.current.value=parseInt(refPC.current.value);
                await delay(1000);
                colorWhite(refMAR);
                /////////////////////////////////////////////////
                refROM.current.value+="T1: PC(I), RAM(E), IR(L)\n";
                colorGreen(refPC);
                refPC.current.value=parseInt(refPC.current.value)+1;
                colorGreen(refRAM);
                await delay(1000);
                colorWhite(refRAM);
                colorGreen(refIr);
                refIr.current.value=name;
                colorWhite(refPC)
                refMAR.current.value=parseInt(refPC.current.value);
                await delay(1000);
                colorWhite(refIr);
                //////////////////////////////////////////////////
                // refROM.current.value+="T2:PC(E), MAR(E,L)\n";
                // colorGreen(refPC)
                // await delay(500);
                // colorWhite(refPC)
                // colorGreen(refMAR);
                // refMAR.current.value=parseInt(refPC.current.value);
                // await delay(500);
                // colorWhite(refMAR);
    }
      
    async function handleClick(){

        const decimalA = parseInt(refA.current.value, 2);
        const decimalB = parseInt(refB.current.value, 2);


        function LCM(a, b){
            let greater = Math.max(a, b);
            let smallest = Math.min(a, b);
            for(let i = greater; i <= a*b; i+=greater){
                if(i % smallest == 0){
                    return i;
                }
            }
        }
        function HCF(a, b){
   
            if(b == 0){
              return a;
            }
             
            return HCF(b, a % b);
          }
        let command=a.split(" ")[0];
        refROM.current.value="";
        switch (command) 
        {
            case "MVI"://DONE
                t1_t2_t3("MVI");
                await delay(5000);
                ///////////////////////////////////////////
                refROM.current.value+="T2: RAM(E), A(L)\n";
                colorGreen(refRAM)
                await delay(500);
                colorWhite(refRAM);
                colorGreen(refA);
                let num=a.split(" ")[1];    
                refA.current.value=num;
                await delay(500);
                colorWhite(refA);
                ////////////////////////////////////////////
                refROM.current.value+="T3:\n";
                await delay(500);
                ///////////////////////////////////////////
                refROM.current.value+="T4:\n";
                await delay(500);
                ////////////////////////////////////////////
                refROM.current.value+="T5: \n";
                await delay(500);
                //////////////////////////////////////////////
                refROM.current.value+="T6: \n";
                await delay(500);
                break;
            case "MOV"://DONE
                t1_t2_t3("MOV");
                await delay(5000);
                refROM.current.value+="T2: A(E), B(L)\n";
                colorGreen(refA);
                await delay(500);
                colorWhite(refA);
                colorGreen(refB);
                if(a.split(" ")[1]=="B,A")
                {
                    refB.current.value=refA.current.value;
                }
                else if(a.split(" ")[1]=="A,B")
                {
                    refA.current.value=refB.current.value;   
                } 
                await delay(500);
                colorWhite(refB);   
                ////////////////////////////////////////////
                refROM.current.value+="T3:\n";
                await delay(500);
                ///////////////////////////////////////////
                refROM.current.value+="T4:\n";
                await delay(500);
                ////////////////////////////////////////////
                refROM.current.value+="T5: \n";
                await delay(500);
                //////////////////////////////////////////////
                refROM.current.value+="T6: \n";
                await delay(500);   
                break;
            case "ADD"://DONE
                t1_t2_t3("ADD");
                await delay(5000);
                //////////////////////////////////////////
                refROM.current.value+="T2: B(E), A(E,L), A=A+B \n";
                colorGreen(refB);
                await delay(500);
                colorWhite(refB);
                const decimalSum = decimalA + decimalB;
                refA.current.value = decimalSum.toString(2);
                colorGreen(refA);
                await delay(500);
                colorWhite(refA);
                ////////////////////////////////////////////
                refROM.current.value+="T3:\n";
                await delay(500);
                ///////////////////////////////////////////
                refROM.current.value+="T4:\n";
                await delay(500);
                ////////////////////////////////////////////
                refROM.current.value+="T5: \n";
                await delay(500);
                //////////////////////////////////////////////
                refROM.current.value+="T6: \n";
                await delay(500);
                break;
            case "AND"://DONE
                t1_t2_t3("AND");
                await delay(5000);
                ///////////////////////////////////////////
                refROM.current.value+="T2: B(E), A(E,L), A = A&B \n";
                colorGreen(refB);
                await delay(500);
                colorWhite(refB);
                colorGreen(refA);
                refA.current.value=(decimalA&decimalB).toString(2);
                await delay(500);
                colorWhite(refA);
                ////////////////////////////////////////////
                refROM.current.value+="T3:\n";
                await delay(500);
                ///////////////////////////////////////////
                refROM.current.value+="T4:\n";
                await delay(500);
                ////////////////////////////////////////////
                refROM.current.value+="T5: \n";
                await delay(500);
                break;
            case "SUB"://DONE
                t1_t2_t3("SUB");
                await delay(5000);
                ///////////////////
                refROM.current.value+="T2: B(E), A(E,L), A = A-B \n";
                colorGreen(refB);
                await delay(500);
                colorWhite(refB);
                colorGreen(refA);
                const decimalSub = decimalA - decimalB;
                refA.current.value = decimalSub.toString(2);
                await delay(500);
                colorWhite(refA);
                ////////////////////////////////////////////
                refROM.current.value+="T4:\n";
                await delay(500);
                ///////////////////////////////////////////
                refROM.current.value+="T5:\n";
                await delay(500);
                ////////////////////////////////////////////
                refROM.current.value+="T6: \n";
                await delay(500);
                break;
            case "OR"://DONE
                /////////////////
                t1_t2_t3("OR");
                await delay(5000);
                ///////////////////
                refROM.current.value+="T2: B(E), A(E,L), A = A||B \n";
                colorGreen(refB);
                await delay(500);
                colorWhite(refB);
                colorGreen(refA);
                refA.current.value=(decimalA|decimalB).toString(2);
                await delay(500);
                colorWhite(refA);
                ////////////////////////////////////////////
                refROM.current.value+="T3:\n";
                await delay(500);
                ///////////////////////////////////////////
                refROM.current.value+="T4:\n";
                await delay(500);
                ////////////////////////////////////////////
                refROM.current.value+="T5: \n";
                await delay(500);
                break;
            case "INR"://DONE
                /////////////////
                t1_t2_t3("INR");
                await delay(5000);
                ///////////////////
                refROM.current.value+="T2: A(E,L), A=A-1 \n";
                await delay(500);
                colorGreen(refA);
                refA.current.value=(decimalA+1).toString(2);
                await delay(500);
                colorWhite(refA);
                ////////////////////////////////////////////
                refROM.current.value+="T3:\n";
                await delay(500);
                ///////////////////////////////////////////
                refROM.current.value+="T4:\n";
                await delay(500);
                ////////////////////////////////////////////
                refROM.current.value+="T5: \n";
                await delay(500);
                break;
            case "DCR"://DONE
                /////////////////
                t1_t2_t3("DCR");
                await delay(5000);
                ///////////////////
                refROM.current.value+="T2: A(E,L), A=A+1 \n";
                await delay(500);
                colorGreen(refA);
                refA.current.value=(decimalA-1).toString(2);
                await delay(500);
                colorWhite(refA);
                ////////////////////////////////////////////
                refROM.current.value+="T3:\n";
                await delay(500);
                ///////////////////////////////////////////
                refROM.current.value+="T4:\n";
                await delay(500);
                ////////////////////////////////////////////
                refROM.current.value+="T5: \n";
                await delay(500);
                break;
            case "SQR":
                /////////////////
                t1_t2_t3("SQR");
                await delay(5000);
                ///////////////////
                ///////////////////
                refROM.current.value+="T2: A(E,L), A = A*A \n";
                await delay(500);
                colorGreen(refA);
                refA.current.value=(decimalA*decimalA).toString(2);
                await delay(500);
                colorWhite(refA);
                ////////////////////////////////////////////
                refROM.current.value+="T3:\n";
                await delay(500);
                ///////////////////////////////////////////
                refROM.current.value+="T4:\n";
                await delay(500);
                ////////////////////////////////////////////
                refROM.current.value+="T5: \n";
                await delay(500);
                break;
            case "SWAP":
                t1_t2_t3("SWAP");
                await delay(5000);
                ///////////////////////////////////////////
                refROM.current.value+="T2:\n";
                await delay(500);
                ///////////////////////////////////////////
                refROM.current.value+="T3:\n";
                await delay(500);
                ///////////////////////////////////////////
                refROM.current.value+="T4:B(E),TMP(L)\n";
                colorGreen(refB);
                await delay(500);
                colorWhite(refB);
                refTemp.current.value=refB.current.value;
                colorGreen(refTemp);
                await delay(500);
                colorWhite(refTemp);
                /////////////////////////////////////////
                refROM.current.value+="T5:A(E),B(L)\n";
                colorGreen(refA);
                await delay(500);
                colorWhite(refA);
                refB.current.value=refA.current.value;
                colorGreen(refB);
                await delay(500);
                colorWhite(refB);
                /////////////////////////////////////////
                refROM.current.value+="T6:A(E),B(L)\n";
                colorGreen(refTemp);
                await delay(500);
                colorWhite(refTemp);
                colorGreen(refA);
                refA.current.value=refTemp.current.value;
                await delay(500);
                colorWhite(refA);
                break;
            case "LCM":
                t1_t2_t3("LCM");
                await delay(5000);
                ///////////////////
                refROM.current.value+="T2: B(E), A(E,L), LCM(A,B) \n";
                await delay(500);
                colorWhite(refRAM);
                colorGreen(refA);
                var x=LCM(decimalA,decimalB);
                refA.current.value= x.toString(2);
                colorWhite(refPC);
                refMAR.current.value=parseInt(refPC.current.value);
                await delay(500);
                colorWhite(refA);
                ////////////////////////////////////////////
                refROM.current.value+="T3:\n";
                await delay(500);
                ///////////////////////////////////////////
                refROM.current.value+="T4:\n";
                await delay(500);
                ////////////////////////////////////////////
                refROM.current.value+="T5:\n";
                break;
            case "HCF":
                t1_t2_t3("HCF");
                await delay(5000);
                ///////////////////
                refROM.current.value+="T2: B(E), A(E,L), HCF(A,B) \n";
                await delay(500);
                colorWhite(refRAM);
                colorGreen(refA);
                var y=HCF(decimalA,decimalB);
                refA.current.value= y.toString(2);
                colorWhite(refPC);
                refMAR.current.value=parseInt(refPC.current.value);
                await delay(500);
                colorWhite(refA);
                ////////////////////////////////////////////
                refROM.current.value+="T3:\n";
                await delay(500);
                ///////////////////////////////////////////
                refROM.current.value+="T4:\n";
                await delay(500);
                ////////////////////////////////////////////
                refROM.current.value+="T5:\n";
                break;
            case "CMA":
                t1_t2_t3("CMA");
                await delay(5000);
                ///////////////////
                refROM.current.value+="T2: A(E,L), A=A' \n";
                await delay(500);
                colorGreen(refA);
                let binaryString = refA.current.value.toString(2);
                var reverse = binaryString.split('').map(x => x === "0" ? "1" : "0").join('');
                refA.current.value =reverse;
                await delay(500);
                colorWhite(refA);
                ////////////////////////////////////////////
                refROM.current.value+="T3:\n";
                await delay(500);
                ///////////////////////////////////////////
                refROM.current.value+="T4:\n";
                await delay(500);
                ////////////////////////////////////////////
                refROM.current.value+="T5: \n";
                await delay(500);
                break;    
            case "LDA":
                t1_t2_t3("LDA");
                await delay(5000);
                refROM.current.value+="T2: PC(E), MAR(E,L)\n";
                colorGreen(refPC)
                await delay(1000);
                colorWhite(refPC)
                colorGreen(refMAR);
                refMAR.current.value=parseInt(refPC.current.value);
                await delay(1000);
                colorWhite(refMAR);
                refROM.current.value+="T3: PC(I), RAM(E),TEMP(L)\n";
                colorGreen(refPC);
                refPC.current.value=parseInt(refPC.current.value)+1;
                await delay(500);
                colorWhite(refPC);
                colorGreen(refRAM);
                await delay(1000);
                colorWhite(refRAM);
                let index=a.split(" ")[1];
                let memory_number=memory[index];
                refTemp.current.value=memory_number;
                refROM.current.value+="T4: TEMP(E),A(L)\n";
                colorGreen(refTemp);
                await delay(1000);
                colorWhite(refTemp);
                colorGreen(refA);
                refA.current.value=refTemp.current.value;
                await delay(1000);
                colorWhite(refA);
                ////////////////////////////////////////////
                refROM.current.value+="T5: \n";
                await delay(500);
                break;
            default:
                refA.current.value="Incorrect Command";
                break;
            }
        refTemp.current.value="0";
        refPC.current.value="0";
        refMAR.current.value="0";
        refRAM.current.value="";
        refRAM.current.focus();
    }


    function reset()
    {
        refA.current.value="";
        refB.current.value="";
        refRAM.current.value="";
        refROM.current.value="";
        refPC.current.value="0";
        refMAR.current.value="0";
        refIr.current.value="";
    }
    

    return (
        <>
            <div className='flowchart'>
                <div className='grid' sx={{ padding: "0%", margin: 0, backgroundColor: "green" }}>
                    <TextField id="outlined-read-only-input" multiline rows={3} label="PC" variant="filled" inputRef={refPC} className='pc box'  sx={{ width: 150 }} InputProps={{ readOnly: true, }} defaultValue="0"/>
                    <svg width="150" height="98"><line x1="75" y1="0" x2="75" y2="98" stroke="white" /></svg>
                    <TextField id="outlined-read-only-input" multiline rows={3} label="MAR" variant="filled" inputRef={refMAR} className='mar box' style={{ width: 150 }} InputProps={{ readOnly: true, }} defaultValue="0" />
                    <svg width="150" height="98"><line x1="75" y1="0" x2="75" y2="98" stroke="white" /></svg>
                    <TextField id="outlined-basic" multiline rows={3} label="RAM" variant="filled" inputRef={refRAM} className='ram box' style={{ width: 150 }} onChange={(e) => { setA(e.target.value); }} />

                </div>
                <div className='grid'>
                    <svg width="50" height="500">
                        <line x1="0" y1="430" x2="25" y2="430" stroke="white" />
                        <line x1="25" y1="200" x2="25" y2="430" stroke="white" />
                        <line x1="25" y1="200" x2="50" y2="200" stroke="white" />
                    </svg>
                </div>
                <div div className='grid'>
                    <svg width="50" height="300">
                        <line x1="0" y1="200" x2="100" y2="200" stroke="white" />
                    </svg>
                </div>
                <div className='grid'>
                    <TextField id="outlined-read-only-input" multiline rows={3} label="B" variant="filled" className='box' inputRef={refB} style={{ width: 150 }} InputProps={{ readOnly: true, }} defaultValue="0" />
                    <svg width="150" height="403" >
                        <line x1="0" y1="97.75" x2="206" y2="97.75" stroke="white" />
                        <line x1="75" y1="0" x2="75" y2="97.75" stroke="white" />
                    </svg>

                </div>
                <div div className='grid'>
                    <svg width="50" height="300">
                        <line x1="0" y1="200" x2="100" y2="200" stroke="white" />
                    </svg>
                </div>
                <div className="grid">
                    <TextField id="outlined-read-only-input" multiline rows={3} label="A" variant="filled" className='box' inputRef={refA} style={{ width: 150 }} InputProps={{ readOnly: true, }} defaultValue="0" />
                    <svg width="150" height="300">
                        <line x1="0" y1="97.75" x2="206" y2="97.75" stroke="white" />
                        <line x1="75" y1="0" x2="75" y2="98" stroke="white" />
                        <line x1="75" y1="98.25" x2="75" y2="299.75" stroke="white" />
                    </svg>
                    
                    <TextField id="outlined-read-only-input" multiline rows={3} label="TEMP" variant="filled" className='box' inputRef={refTemp} style={{ width: 150 }} InputProps={{ readOnly: true, }} defaultValue="0" />
                </div>
                <div div className='grid'>
                    <svg width="50" height="300">
                        <line x1="0" y1="200" x2="100" y2="200" stroke="white" />
                        <line x1="0" y1="20" x2="100" y2="20" stroke="white" />
                        <line x1="25" y1="200" x2="25" y2="60" stroke="white" />
                        <line x1="25" y1="60" x2="100" y2="60" stroke="white" />
                    </svg>
                </div>
                <div className='grid'>
                    <div className='alu box'>ALU</div>
                    <svg width="200" height="50"></svg>
                    <TextField id="outlined-read-only-input" multiline rows={2} label="IR" variant="filled" className='ir box' inputRef={refIr} style={{ width: 150 }} InputProps={{ readOnly: true, }} defaultValue="0" />
                    <svg width="200" height="70"><line x1="75" y1="0" x2="75" y2="100" stroke="white" /></svg>
                    <TextField id="outlined-read-only-input" multiline rows={7} label="ROM" variant="filled" className='rom box' inputRef={refROM} style={{ width: 270 }} InputProps={{ readOnly: true, }} defaultValue="0" />
                </div>
            </div>
            <div className="buttons" >
                <Button variant="contained" className="but" onClick={handleClick} style={{backgroundColor: '#408E91'}}>Execute</Button>
                {/* <Button variant="contained" className="but" style={{backgroundColor: '#408E91'}}>Next</Button> */}
                <Button variant="contained" className="but" onClick={reset} style={{backgroundColor: '#408E91'}}>Reset</Button>
            </div>
        </>
    )
};

export default FlowChart
