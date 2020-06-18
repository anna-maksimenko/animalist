<script>
    import { slide } from 'svelte/transition'
    import { sectionSettings } from '../../../globals.js'

    export let announcementOpen = false

    function closeHandler(){
        announcementOpen = false
    }

    function openHandler(){
        announcementOpen = true
    }
</script>

<style>
    .poster-announcement-bar-outer-cont {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
    }
    .poster-announcement-bar-triangle {
        position: absolute;
        top: 0;
        right: 0;
        width: 40px;
        height: 40px;
        text-align: right;
        cursor: pointer;
    }
    .poster-announcement-bar-triangle .triangle-outer {
        display: inline-block;
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid black;
        border-top: 6px solid black;
        border-bottom: 6px solid transparent;
        -webkit-transition: border 0.2s;
        -o-transition: border 0.2s;
        transition: border 0.2s;
        vertical-align: top;
    }
    .poster-announcement-bar-triangle:hover .triangle-outer {
        border-left: 10px solid transparent;
        border-right: 10px solid black;
        border-top: 10px solid black;
        border-bottom: 10px solid transparent;
    }
    .poster-announcement-bar {
        background-color: #000;
    }
    .poster-announcement-bar-inner {
        display: flex;
        justify-content: center;
        position: relative;
        padding: 10px 16px;
    }
    @media screen and (max-width: 1023px) {
        .poster-announcement-bar-inner {
            padding: 18px;
        }
    }
    .poster-announcement {
        align-self: center;
        margin: 0;
        flex-grow: 2;
        text-align: center;
    }
    .poster-announcement :global(p), .poster-announcement :global(a){
        color: #fff;
        letter-spacing: 0.88px;
        line-height: 1.625;
        align-self: center;
        margin: 0;
        flex-grow: 2;
        text-align: center;
        font-size: 14px;
        font-family: Avenir Next;
    }
    @media screen and (max-width: 1023px) {
        .poster-announcement :global(p),.poster-announcement :global(a){
            font-size: 14px;
        }
    }
    @media screen and (max-width: 640px) {
        .poster-announcement :global(p), .poster-announcement :global(a){
            font-size: 12px;
        }
    }
    .poster-announcement-bar .close-btn {
        position: absolute;
        top: 50%;
        right: 9px;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
        align-self: center;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    @media screen and (max-width: 1023px) {
        .poster-announcement-bar .close-btn{
            right: 8px;
        }
    }
    @media screen and (max-width: 374px) {
        .poster-announcement-bar .close-btn{
            right: 0;
        }
    }
    .poster-announcement-bar .close-btn svg {
        width: 11px;
        height: 11px;
    }
    @media screen and (max-width: 1023px) {
        .poster-announcement-bar .close-btn svg {
            width: 11px;
            height: 11px;
        }
    }
    @media screen and (max-width: 640px) {
        .poster-announcement-bar .close-btn svg {
            width: 8px;
            height: 8px;
        }
    }
</style>



<div class="poster-announcement-bar-outer-cont" transition:slide>
    <div class="poster-announcement-bar-triangle">
        <div class="triangle-outer" on:click={openHandler}></div>
    </div>
    {#if announcementOpen}
        <div class="poster-announcement-bar" transition:slide>
            <div class="poster-announcement-bar-inner">
                <div class="poster-announcement">
                    {@html $sectionSettings['announcement-text']}
                </div>
                <span class="close-btn" on:click={closeHandler}>
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" x="0px" y="0px"
                            viewBox="0 0 30 30" style="enable-background:new 0 0 30 30;" xml:space="preserve">
                    <style type="text/css">
                        .st0{fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;}
                    </style>
                    <line class="st0" x1="1.26" y1="1.26" x2="29" y2="29"/>
                    <line class="st0" x1="29" y1="1.26" x2="1.26" y2="29"/>
                    </svg>
                </span>
            </div>
        </div>
    {/if}
</div>
