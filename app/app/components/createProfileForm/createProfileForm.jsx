"use client";
import OccupationTags from "../occupationTags/OccupationTags";
import defaultProfilePicture from "../../images/defaultProfilePicture.jpg";
import editIcon from "../../images/pencil-solid.svg";
import { useState, useEffect } from "react";
import { createAProfile } from "../../createProfile/api/createAProfile.js";
import React from 'react';

import Image from "next/legacy/image";

function CreateProfileForm() {
   


    function requiredFieldsFilledIn()
    {
        if(fullName.value.trim() === "" || country.value.trim() === "" || address.value.trim() === "")
            return false
        else return true
    };

    

    function formDataAsJSON()
    {
        return {
            fullName: fullName.value,
            country: country.value,
            address: address.value,
            bio: bio.value,
            occupationTags: JSON.stringify(currentTags),
        };
    };

    function handleSubmit(event) {
        event.preventDefault();
        if(requiredFieldsFilledIn())
            if(createAProfile(formDataAsJSON()))
                alert("Created Your Profile")
            else alert("Could Not Create Your Profile")
        
    };


    return (
        <>
            <form action="" method="post" className="flex justify-center relative overflow-y-auto w-full h-screen overflow-y-auto bg-gradient-to-r from-blue-500 to-green-500" onSubmit={handleSubmit}>
                <div id = "labels-and-inputs-container" className = "flex h-[100vh] min-w-[25rem] w-1/2 max-w-[50rem] flex-col items-center p-2 bg-green-500"> {/* Ensures the labels div and the inputs div are side-by-side */}
                    <CreateProfileHeader/>
                    <ProfilePicture/>
                    <FormLabelsAndInputs/>
                </div>        
            </form>         
        </>
    );
}


function CreateProfileHeader()
{
    return (
    <div className = "w-full mb-10 mt-20 flex justify-center">
        <h1 className = "font-semibold mobile:text-[2rem] tablet:text-[3rem] desktop:text-[4rem]">Create Your Profile</h1> 
    </div>
    );

}

function FormLabelsAndInputs()
{

    const [currentTags, setTags] = useState([]); /* Send this as a reference to OccupationTags */
    /* OccupationTags will be able to modify currentTags as needed, but CreateProfileForm has access to it */
    /* Given that currentTags is an object, any change to it in OccupationTags will be reflected in memory */
    const [fullName, setFullName] = useState("");
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [bio, setBio] = useState("");

    const [fullNameLabelHTML, setFullNameLabelHTML] = useState({__html:'Full Name: <span class = "text-red-500"> * </span>'});
    const[countryLabelHTML, setCountryLabelHTML] = useState({__html: 'Country Of Residence: <span class = "text-red-500"> * </span> '});
    const [addressLabelHTML, setAddressLabelHTML] = useState({__html: 'Address: <span class = "text-red-500"> * </span> '});

    // Using dangerouslySetInnerHTML allows us to set the innerHTML of a label, which is useful for adding a red asterisk to required fields and for adding error messages
    // dangerouslySetInnerHTML does not have a security risk here because we are not using user input to set the innerHTML, we are using a string that we have defined ourselves
    // dangerouslySetInnerHTML does have a security risk if we were to use user input to set the innerHTML, because it would allow users to inject HTML into our page, but since we are using a label and it is not possible to save this HTML to the database or show it to other users, there is no security risk here.
    
    function onFullNameChange(e)
    {
        const value = e.target.value.trim();
        setFullName(value);

        if(value == "")
            setFullNameLabelHTML({__html:'<span class = "text-red-500"> You cannot leave this field empty! Please enter your full name:</span>'});

        else      
            setFullNameLabelHTML({__html: 'Full Name: <span class = "text-red-500"> * </span> '});
        
    };

    function onCountryChange(e)
    {
        const value = e.target.value.trim();
        setCountry(value);
        if(value == "")
            setCountryLabelHTML({__html: '<span class = "text-red-500"> You cannot leave this field empty! Please enter your country of residence:</span>'});
        else      
            setCountryLabelHTML({__html: 'Country Of Residence: <span class = "text-red-500"> * </span> '});
    
    };

    function onAddressChange(e)
    {
        const value = e.target.value.trim();
        setAddress(value);
        if(value == "")
            setAddressLabelHTML({__html:'<span class = "text-red-500"> You cannot leave this field empty! Please enter your address:</span>'});
        else      
            setAddressLabelHTML({__html: 'Address: <span class = "text-red-500"> * </span>'}); 
    };

    function onBioChange(e)
    {
        const value = e.target.value.trim();
        setBio(value);
    }
    
    return(
    <>
        <FlexLabelAndTextInput labelVal = {fullNameLabelHTML} inputName = "fullName" required = {true} onChangeFunction = { onFullNameChange }/> 
        <FlexLabelAndTextInput labelVal = {countryLabelHTML} inputName="country" required = {true} onChangeFunction = { onCountryChange } /> 
        <FlexLabelAndTextInput labelVal = {addressLabelHTML} inputName = "address" required = {true} onChangeFunction = { onAddressChange }  /> 
        <FlexLabelAndOtherInput labelVal = "Occupation Tags:" assoc = "occupationTags"> <OccupationTags  id = "occupationTags" inputName = "occupationTags" inputFieldStyles = "w-3/4 h-[2.5rem] rounded-md" textSize = "text-[1.25rem]" tagColor = "bg-green-500" currentTags = {currentTags} setTags = {setTags}/></FlexLabelAndOtherInput> 
        <FlexLabelAndOtherInput labelVal = "Bio:" assoc = "bio"> <textarea id = "bio" className = "mobile:h-[10rem] tablet:h-[20rem] desktop:h-[30rem] text-black w-3/4 rounded-md text-[1.25rem]" name = "bio" onChange = {onBioChange}></textarea> </FlexLabelAndOtherInput> 
        <FormButtons/>
    </>
    );
    
};

function FlexLabelAndOtherInput (props)
{
    return(
    <div className = "w-full mt-10 mb-10 flex flex-col items-center "> {/* Flex box ensures that the occupation tags can keep growing while pushing down the bio*/}
            <label htmlFor = {props.assoc} className = "mobile:text-[1rem] tablet:text-[2rem] desktop:text-[2rem]">{props.labelVal}</label>
            <br></br>
            {props.children}
    </div>);
};
    
function FlexLabelAndTextInput(props)
{
return(
    <div className = "w-full mt-10 mb-10 flex flex-col items-center">
        <label htmlFor = {props.inputName} cum = {props.inputName} className="mobile:text-[1rem] tablet:text-[2rem] desktop:text-[2rem]" dangerouslySetInnerHTML={props.labelVal}></label>  {/* "for" attribute specified what input a label is associated by providing the ID of the input*/}
        <br></br>
        <input id = {props.inputName}  type = "text" className = "text-black w-3/4 h-[2.5rem] rounded-md text-[1.25rem]" name = {props.inputName} required = {props.required}  onChange = {props.onChangeFunction} ></input>
    </div>);
    
};

function FormButtons()
{

    return(
    <div className = "flex w-full bg-red-500 mobile:flex-col mobile:space-y-10 mobile:items-center tablet:space-x-52 tablet:space-y-0 tablet:flex-row tablet:justify-center ">
    <button className = "bg-black p-2 font-semibold rounded-lg hover:text-green-500 w-1/2">GO BACK</button>
    <button className = "bg-black p-2 font-semibold rounded-lg hover:text-green-500 w-1/2">SUBMIT</button>
    </div>
    );

};

function ProfilePicture() 
{
    const [image, setImage] = useState(defaultProfilePicture);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditButtonClick = function(e)
    {
        e.preventDefault();
        document.getElementById("edit-pfp").click();
    };

    function Picture(){
        return(
            <div className="relative w-[20vw] h-[20vw]" style = { {maxWidth: '300px', maxHeight: '300px', minWidth:'10rem', minHeight: '10rem'} }>
                <Image id = "pfp" src={image} alt="Profile Preview" layout="fill" objectFit="cover" className="rounded-full" />
            </div>   
        )
    };

    function EditPictureButton()
    {
        return(
        <div id = "edit-pfp-button-container" className = "relative w-[2vw] h-[2vw] max-h-[70px] max-w-[70px]">
            <button id = "edit-pfp-button"><Image src = {editIcon} layout = "fill" objectFit = "cover" alt = "Edit" onClick = {handleEditButtonClick}></Image></button>
            <input id="edit-pfp" type="file" accept="image/*" onChange={handleImageChange} className = "hidden" />
        </div>
        );
    };

    return (
        <div id="pfp-container" className="w-full h-fullpx flex flex-col justify-center items-center">
            <Picture/>
            <EditPictureButton/>
        </div>
    );

}

export default CreateProfileForm;
