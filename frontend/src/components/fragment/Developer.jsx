import React from 'react';
import '../assets/scss/Developer.scss';
import {IconButton} from "@material-ui/core";
import AvatarImage from "../assets/img/avatar.png";
import {Facebook, Instagram, LinkedIn, Twitter} from "@material-ui/icons";

const Developer = () => {
    return (
        <div className={"Developer"}>
            <h3 className={"Developer-head"}>Meet the developer</h3>
            <div className="Developer-profile">
                <div className="Developer-profileCard">
                    <img src={AvatarImage} alt="Profile"/>
                    <div className={"Card-details"}>
                        <h3>Safan Vhora</h3>
                        <p>Full Stack developer</p>
                        <p>Competitive Coder</p>
                    </div>
                </div>
                <div className="Developer-profileDetails">
                    <p>A Computer Science and Engineering Student at Madhuben and Bhanubhai Instiute of Technoligy, Gujarat.</p>
                    <p>Graduating in 2023 and looking for a responsible position to gain practical knowledge</p>
                    <p>A full-stack web developer and a Competitive coder.</p>
                    <p>I love designing fully responsive websites.</p>
                    <p>I have a keen interest in developing projects, whenever I want to learn something new.</p>
                    <p>And a photographer.</p>
                    <div className="Card-btn">
                    <IconButton target={"_blank"}  href={"https://www.facebook.com/safan.vahora.5"} title={"safan.vahora.5"}>
                            <Facebook/>
                        </IconButton>
                        <IconButton target={"_blank"} href={"https://twitter.com/vir8_18"}  title={"vir18"}>
                            <Twitter/>
                        </IconButton>
                        <IconButton target={"_blank"} href={"https://www.linkedin.com/in/safan-vhora-5a6185219/"}  title={"safan-vhora"}>
                            <LinkedIn/>
                        </IconButton>
                        <IconButton target={"_blank"} href={"https://www.instagram.com/damn_itz_safan/"}  title={"damn_itz_safan"}>
                            <Instagram/>
                        </IconButton>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Developer;