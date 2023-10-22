"use client";
import OccupationTags from '../occupationTags/OccupationTags'

function CreateProfileForm() {
    return (

            <form action="" method="post" className = "w-1/2 h-1/2 flex flex-col bg-red-500">

            <div className = "w-full flex justify-center"><h1 className = "text-[5vh]">Create Profile</h1></div>
            <div id = "labels-and-inputs-container" className = "flex h-full w-full flex-col "> {/* Ensures the labels div and the inputs div are side-by-side */}
                <FlexLabelAndTextInput labelVal = "Full Name" inputName = "fullName"/> 
                <FlexLabelAndTextInput labelVal = "Country Of Residence" inputName="country"/> 
                <FlexLabelAndTextInput labelVal = "Address" inputName = "address"/> 
                <FlexLabelAndOtherInput labelVal = "Occupation Tags"> <OccupationTags/></FlexLabelAndOtherInput> 
                <FlexLabelAndOtherInput labelVal = "Bio"> <textarea className = "text-black w-1/2 h-[18vh] resize-y" name = "bio"> </textarea> </FlexLabelAndOtherInput> 
            </div>

                
                <div id = "form-buttons" className = "flex justify-between width-full">
                    <button id="go-back" className = "bg-purple-500">Go Back</button>
                    <input type="submit" className = "bg-purple-500" value="Submit" />
                </div>
            </form>
           

    );
}

function FlexLabelAndOtherInput(props){
    return(
        <div className = "flex-grow w-full bg-yellow-500">
            <label className = "text-lg">{props.labelVal}</label>
            <br></br>
            {props.children}
        </div>);
}

function FlexLabelAndTextInput(props){
    return(
        <div className = "flex-grow w-full bg-yellow-500">
            <label className="text-lg"> {props.labelVal} </label>
            <br></br>
            <input type = "text" className = "text-black w-1/2" name = {props.inputName}></input>
        </div>);

    }

export default CreateProfileForm;