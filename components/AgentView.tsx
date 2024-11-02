import { ConversationView } from "@convo-lang/convo-lang-react";
import { atDotCss } from "@iyio/at-dot-css";
import { NextJsBaseLayoutView } from "@iyio/nextjs-common";
import { useRef, useState } from "react";
import { ArtifactsView } from "./ArtifactsView";



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



export function AgentView(){

    const canvas=useRef<HTMLDivElement|null>(null);
    const [html,setHtml]=useState('');
    const [js,setJs]=useState('');

    const setHtmlAsync=async (html:string,javascript:string)=>{
        const c=canvas.current;
        if(!c){
            return 'Canvas not ready';
        }
        setHtml(html);
        setJs(javascript)
        return 'Done'
    }

    const getSize=()=>({
        width:canvas.current?.clientWidth??0,
        height:canvas.current?.clientHeight??0,
    })

    return (
        <NextJsBaseLayoutView className={style.root()}>

            <div className={style.contentArea()}>
                <ArtifactsView
                    canvas={canvas}
                    html={html}
                    onHtmlChange={setHtml}
                    js={js}
                    onJsChange={setJs}
                />
            </div>

            <div className={style.chat()}>
                <ConversationView
                    theme="dark"
                    showInputWithSource
                    enabledSlashCommands
                    template={convoScript}
                    httpEndpoint="/api/convo-lang"
                    externFunctions={{
                        setHtml:setHtmlAsync,
                        getSize,
                    }}
                />
            </div>

        </NextJsBaseLayoutView>
    )

}


// For syntax highlighting of at-dot-css install the High-js VSCode extension.
// Search for "high-js" in the extensions window.
const style=atDotCss({name:'AgentView',css:`
    @.root{
        display:flex;
        height:100%;
        width:100%;
        border-radius:8px;
        padding:1rem;
        gap:1rem;
    }
    @.contentArea{
        flex:1;
        position:relative;
    }
    
    @.chat{
        display:flex;
        flex-direction:column;
        width:500px;
        background-color:#222;
        border-radius:8px;
        border:1px solid #444;
    }
`});
