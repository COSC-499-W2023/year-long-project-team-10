<<<<<<< HEAD
"use client";
import OccupationTags from "../occupationTags/OccupationTags";
import defaultProfilePicture from "../../images/defaultProfilePicture.jpg";
import editIcon from "../../images/pencil-solid.svg";
import { useState, useEffect } from "react";
import { createAProfile } from "../../createProfile/api/createAProfile.js";

import Image from "next/legacy/image";

function CreateProfileForm() {
    const [currentTags, setTags] = useState([]); /* Send this as a reference to OccupationTags */
    /* OccupationTags will be able to modify currentTags as needed, but CreateProfileForm has access to it */
    /* Given that currentTags is an object, any change to it in OccupationTags will be reflected in memory */

    



    var fullName, country, address, bio, occupationTags, pfp;

    function collectFormData()
    {
        fullName = document.querySelector('[name = "fullName"]');
        country = document.querySelector('[name = "country"]');
        address = document.querySelector('[name = "address"]');
        bio = document.querySelector('[name = "bio"]');
        occupationTags = document.querySelector('[name = "occupationTags"]');
        pfp = document.querySelector("#pfp");
    }

    function onFullNameChange(e){
        const label = document.querySelector('[for = "fullName"]');
        if(e.target.value == "")
         label.innerHTML = '<span class = "text-red-500"> You cannot leave this field empty! Please enter your full name:</span>';
        else
        {          
            label.innerHTML = 'Full Name: <span class = "text-red-500"> * </span> '
        }
    };

    function onCountryChange(e)
    {
        const label = document.querySelector('[for = "country"]');
        if(e.target.value == "")
         label.innerHTML = '<span class = "text-red-500"> You cannot leave this field empty! Please enter your country of residence:</span>';
        else
        {          
            label.innerHTML = 'Country Of Residence: <span class = "text-red-500"> * </span> '
        }
    };

    function onAddressChange(e)
    {
        const label = document.querySelector('[for = "address"]');
        if(e.target.value == "")
         label.innerHTML = '<span class = "text-red-500"> You cannot leave this field empty! Please enter your address:</span>';
        else
        {          
            label.innerHTML = 'Address: <span class = "text-red-500"> * </span>'
        }
    };

    

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

    function displayErrorOnRequiredFields()
    {
        const fullNameLabel = document.querySelector('[for = "fullName"]');
        const countryLabel = document.querySelector('[for = "country"]');
        const addressLabel = document.querySelector('[for = "address"]');

        if(fullName.value.trim() == "")
            fullNameLabel.innerHTML = '<span class = "text-red-500"> You cannot leave this field empty! Please enter your full name:</span>';
        if(country.value.trim() == "")
            countryLabel.innerHTML = '<span class = "text-red-500"> You cannot leave this field empty! Please enter your country of residence:</span>';
        if(address.value.trim() == "")
            addressLabel.innerHTML = '<span class = "text-red-500"> You cannot leave this field empty! Please enter your address:</span>';
    };

    function handleSubmit(event) {
        event.preventDefault();
    
        collectFormData();
        if(requiredFieldsFilledIn())
            if(createAProfile(formDataAsJSON()))
                alert("Created Your Profile")
            else alert("Could Not Create Your Profile")
        else displayErrorOnRequiredFields();
        
    };


    function CreateProfileHeader()
    {
        return (
        <div className = "w-full mb-10 mt-20 flex justify-center">
            <h1 className = "font-semibold mobile:text-[5vw] tablet:text-[4rem] desktop:text-[4rem]">Create Your Profile</h1> 
        </div>
        );

    }

    function FlexLabelAndOtherInput(props)
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
                <label htmlFor = {props.inputName} cum = {props.inputName} className="mobile:text-[1rem] tablet:text-[2rem] desktop:text-[2rem]"> {props.labelVal} {props.required && <span className = "text-red-500"> * </span> } </label>  {/* "for" attribute specified what input a label is associated by providing the ID of the input*/}
                <br></br>
                <input id = {props.inputName}  type = "text" className = "min-w-[15rem] text-black w-3/4 h-[2.5rem] max-w-[35rem] rounded-md text-[1.25rem]" name = {props.inputName} required = {props.required}  onChange = {props.onChangeFunction} ></input>
            </div>);
    
        };
    
    function FormLabelsAndInputs()
    {
        return(
        <>
            <FlexLabelAndTextInput labelVal = "Full Name:" inputName = "fullName" required = {true} onChangeFunction = { onFullNameChange }/> 
            <FlexLabelAndTextInput labelVal = "Country Of Residence:" inputName="country" required = {true} onChangeFunction = { onCountryChange } /> 
            <FlexLabelAndTextInput labelVal = "Address:" inputName = "address" required = {true} onChangeFunction = { onAddressChange }  /> 
            <FlexLabelAndOtherInput labelVal = "Occupation Tags:" assoc = "occupationTags"> <OccupationTags id = "occupationTags" inputName = "occupationTags" inputWidth = "w-3/4 max-w-[35rem] min-w-[15rem]" inputHeight="h-[2.5rem]" cornerDesign = "rounded-md" textSize = "text-[1.25rem]" tagColor = "bg-green-500" currentTags = {currentTags} setTags = {setTags}/></FlexLabelAndOtherInput> 
            <FlexLabelAndOtherInput labelVal = "Bio:" assoc = "bio"> <textarea id = "bio" className = "min-w-[15rem] min-h-[10rem] text-black w-3/4 max-w-[35rem] h-[18vw] rounded-md text-[1.25rem]" name = "bio"></textarea> </FlexLabelAndOtherInput> 
        </>
        )
    
    };


    return (
        <>
            <form action="" method="post" className="flex justify-center relative overflow-y-auto w-full h-screen overflow-y-auto bg-gradient-to-r from-blue-500 to-green-500" onSubmit={handleSubmit}>
                <div id = "labels-and-inputs-container" className = "flex h-[100vh] w-1/2 flex-col items-center p-2"> {/* Ensures the labels div and the inputs div are side-by-side */}
                    <CreateProfileHeader/>
                    <ProfilePicture/>
                    <FormLabelsAndInputs/>
                    <button className = "bg-black p-2 font-semibold rounded-lg hover:text-green-500 w-1/4" onClick = {handleSubmit}>SUBMIT</button>
                </div>        
            </form>         
        </>
    );
}


function ProfilePicture() {
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

    const handleEditButtonClick = function(e){
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

    function EditPictureButton(){
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
=======
"use client";
import OccupationTags from "../occupationTags/OccupationTags";
import defaultProfilePicture from "../../images/defaultProfilePicture.jpg";
import editIcon from "../../images/pencil-solid.svg";
import { useState, useEffect } from "react";
import { createAProfile } from "../../createProfile/api/createAProfile.js";
import React from 'react';

import Image from "next/legacy/image";

function CreateProfileForm() {
   
    return (
        <>
            <form action="" method="post" className="flex justify-center relative overflow-y-auto w-full h-screen overflow-y-auto bg-gradient-to-r from-blue-500 to-green-500">
                <div id = "labels-and-inputs-container" className = "flex h-[100vh] min-w-[25rem] w-1/2 max-w-[50rem] flex-col items-center p-2"> {/* Ensures the labels div and the inputs div are side-by-side */}
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

    function displayRequiredFields()
    {
        if(fullName == "")
            setFullNameLabelHTML({__html:'<span class = "text-red-500"> You cannot leave this field empty! Please enter your full name:</span>'});
        if(country == "")
            setCountryLabelHTML({__html: '<span class = "text-red-500"> You cannot leave this field empty! Please enter your country of residence:</span>'});
        if(address == "")
            setAddressLabelHTML({__html:'<span class = "text-red-500"> You cannot leave this field empty! Please enter your address:</span>'});
    }
    function formDataAsJSON()
    {
        return {
            fullName: fullName,
            country: country,
            address: address,
            bio: bio,
            occupationTags: JSON.stringify(currentTags),
        };
    };

    function onSubmit(e)
    {
        e.preventDefault();
        if(fullName != "" && country != "" && address != "")
            if(createAProfile(formDataAsJSON()))
                alert("Created Your Profile")
            else alert("Could Not Create Your Profile")
        else displayRequiredFields();
    }

    
    return(
    <>
        <FlexLabelAndTextInput labelVal = {fullNameLabelHTML} inputName = "fullName" required = {true} onChangeFunction = { onFullNameChange } placeHolder = "e.g., John Wilfred Doe"/> 
        <FlexLabelAndTextInput labelVal = {countryLabelHTML} inputName="country" required = {true} onChangeFunction = { onCountryChange } placeHolder = "e.g, Canada"/> 
        <FlexLabelAndTextInput labelVal = {addressLabelHTML} inputName = "address" required = {true} onChangeFunction = { onAddressChange } placeHolder = "e.g, 111 Wellington St."  /> 
        <FlexLabelAndOtherInput labelVal = "Occupation Tags:" inputName = "occupationTags"> <OccupationTags  id = "occupationTags" inputName = "occupationTags" inputFieldStyles = "w-3/4 h-[2.5rem] rounded-md p-2 text-[1.25rem]" placeHolder = "e.g, Software Engineer" tagColor = "bg-green-500" currentTags = {currentTags} setTags = {setTags}/></FlexLabelAndOtherInput> 
        <FlexLabelAndOtherInput labelVal = "Bio:" inputName = "bio"> <textarea id = "bio" className = "mobile:h-[15rem] tablet:h-[20rem] desktop:h-[30rem] text-black w-3/4 rounded-md text-[1.25rem] resize-none p-2" name = "bio" placeholder= "e.g, I have a Bachelor's degree in computer science and am an avid learner. While I love working in software, when not at work, you can find me in the great outdoors." onChange = {onBioChange}></textarea> </FlexLabelAndOtherInput> 
        <FormButtons onSubmitHandler = {onSubmit} />
    </>
    );
    
};

function FlexLabelAndOtherInput (props)
{
   

    return(
    <div className = "w-full mt-10 mb-10 flex flex-col items-center"> {/* Flex box ensures that the occupation tags can keep growing while pushing down the bio*/} 
            <label htmlFor = {props.inputName} className = "font-semibold mb-2 hover:cursor-text mobile:text-[1rem] tablet:text-[1.25rem] desktop:text-[1.25rem]">{props.labelVal}</label>
            <br></br>
            {props.children} 
    </div>);
};
    
function FlexLabelAndTextInput(props)
{
   

return(
    <div className = "w-full mt-10 mb-10 flex flex-col items-center">
            <label htmlFor = {props.inputName} cum = {props.inputName} className="font-semibold mb-2 hover:cursor-text mobile:text-[1rem] tablet:text-[1.25rem] desktop:text-[1.25rem]" dangerouslySetInnerHTML={props.labelVal}></label>  {/* "for" attribute specified what input a label is associated by providing the ID of the input*/}
            <br></br>
            <input id = {props.inputName}  type = "text" className = "text-black w-3/4 p-2 h-[2.5rem] rounded-md text-[1.25rem]" name = {props.inputName} required = {props.required}  onChange = {props.onChangeFunction} onBlur = {props.onChangeFunction} placeholder = {props.placeHolder}></input>
    </div>);
    
};

function FormButtons({onSubmitHandler})
{

    return(
    <div className = "flex mobile:w-full mobile:flex-col-reverse mobile:items-center mobile:space-y-reverse mobile:space-y-5 desktop:w-3/4 desktop:space-x-52 desktop:space-y-0 desktop:flex-row desktop:justify-center "> {/* space-y puts margin top on the seocnd, third, fourth, etc elements. But, if col-reversed, the margin-top property still remains. You'll need to specify space-y-reverse to ensure the correct order of margin-top*/}
        <button className = "h-fit my-2 p-2 text-xl font-normal rounded-lg bg-black border-2 border-black hover:bg-white text-white hover:text-black transition-all duration-300 ease-in-out w-3/4">Go Back</button>
        <button className = "h-fit my-2 p-2 text-xl font-normal rounded-lg bg-black border-2 border-black hover:bg-white text-white hover:text-black transition-all duration-300 ease-in-out w-3/4" onClick = {onSubmitHandler}>Create Profile</button>
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

    function Picture()
    {
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
>>>>>>> 905c9c7f29a6fee09c93efc774d218ea876bc0ac
