import { atDotCss } from "@iyio/at-dot-css";
import { LazyCodeInput } from "@iyio/syn-taxi";
import { MutableRefObject, useEffect, useState } from "react";

export interface ArtifactsViewProps
{
    canvas:MutableRefObject<HTMLDivElement|null>;
    html:string;
    onHtmlChange:(html:string)=>void;
    js:string;
    onJsChange:(js:string)=>void;
}

export function ArtifactsView({
    canvas,
    html,
    onHtmlChange,
    js,
    onJsChange
}:ArtifactsViewProps){

    const [tab,setTab]=useState<'rendered'|'html'|'js'>('rendered');

    useEffect(()=>{
        const iv=setTimeout(()=>{
            try{
                eval(js);
            }catch(ex){
                console.warn('javascript editor error',ex);
            }
        },2000);
        return ()=>{
            clearTimeout(iv);
        }
    },[js]);

    return (
        <>
            <div
                className={style.container({active:tab==='rendered'},style.canvas())}
                ref={canvas}
                dangerouslySetInnerHTML={{__html:html}}
            />
            <div className={style.container({active:tab==='html'})}>
                <LazyCodeInput
                    absFill
                    value={html}
                    language="html"
                    lineNumbers
                    onChange={onHtmlChange}
                />
            </div>
            <div className={style.container({active:tab==='js'})}>
                <LazyCodeInput
                    absFill
                    value={js}
                    language="javascript"
                    lineNumbers
                    onChange={onJsChange}
                />

            </div>
            <div className={style.buttons()}>
                <button className={style.btn({active:tab==='rendered'})} onClick={()=>setTab('rendered')}>Rendered</button>
                <button className={style.btn({active:tab==='html'})} onClick={()=>setTab('html')}>HTML</button>
                <button className={style.btn({active:tab==='js'})} onClick={()=>setTab('js')}>JavaScript</button>
            </div>
        </>
    )

}

const style=atDotCss({name:'ArtifactsView',css:`
    @.container{
        display:none;
        overflow:hidden;
        border-radius:8px;
        border:1px solid #444;
        position:absolute;
        left:0;
        top:0;
        right:0;
        bottom:0;
    }
    @.container.active{
        display:block;
    }
    @.buttons{
        position:absolute;
        right:1rem;
        bottom:1rem;
        display:flex;
        gap:0.5rem;
    }
    @.btn{
        border-radius:8px;
        border:1px solid #444;
        background-color:#444;
        padding:0.5rem 1rem;
    }
    @.btn.active{
        background-color:#5C92F1;
    }
    @.canvas{
        --foreground:#333333;
        --background:#ffffff;
        color:#333333;
    }
    @.canvas *{
        all:revert;
    }
    @.canvas input{
        background:#ffffff;
    }
`});