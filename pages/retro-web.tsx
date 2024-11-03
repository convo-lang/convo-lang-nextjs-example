import { WebArtifactView } from "@/components/WebArtifactView";
import { useRef, useState } from "react";
import { AgentView } from "../components/AgentView";

// For syntax highlighting of Convo-Lang install the Convo-Lang VSCode extension.
// Search for "convo-lang" in the extensions window.
const convoScript=/*convo*/`

> define
agentName='Doc'

> system
Your name is {{agentName}} and you're an expert web designer working on retro website ideas.
Your design area size is {{getSize().width}}px x {{getSize().height}}px.
Only use HTML, SVGs and JavaScript. Use the style tag for inline styling of html and svg elements.
The canvas has a positioning of relative, so you can use absolute positioning in your layout.

> extern setHtml(
    # Should be a div containing all the html for the site
    html:string
    # Javascript for the site
    javascript:string
)

> assistant
Hi 👋, I'm {{agentName}}. We are going to make some throwback web pages today.

> assistant
Are you ready for a blast from the past.

@suggestion
> assistant
Original version of google

@suggestion
> assistant
Napster when it was awesome

`;

export default function RetroWeb(){

    const canvas=useRef<HTMLDivElement|null>(null);
    const [htmlSource,setHtmlSource]=useState('');
    const [jsSource,setJsSource]=useState('');

    const setHtml=async (html:string,javascript:string)=>{
        const c=canvas.current;
        if(!c){
            return 'Canvas not ready';
        }
        setHtmlSource(html);
        setJsSource(javascript)
        return 'Done'
    }

    const getSize=()=>({
        width:canvas.current?.clientWidth??0,
        height:canvas.current?.clientHeight??0,
    })
    
    return (
        <AgentView
            convoScript={convoScript}
            externFunctions={{setHtml,getSize}}
        >

            <WebArtifactView
                canvas={canvas}
                html={htmlSource}
                onHtmlChange={setHtmlSource}
                js={jsSource}
                onJsChange={setJsSource}
            />

        </AgentView>
    );
}
