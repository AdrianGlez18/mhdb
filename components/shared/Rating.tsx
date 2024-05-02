
//import StarIcon from '../../public/assets/icons/star.svg';

import { useEffect, useState } from "react";
import { InputProps } from "../ui/input";
import React from "react";

const Rating = ({ rating, setRating }: any)/* React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) */ => {
    const chosenStyles = `bg-blue-500 text-white`;
    //const [rating, setRating] = useState("0")
    const handleSubmit = () => {
        //setSubmitted(true);
    };


    /* useEffect(() => {
       (document!.getElementById(":Runnnnjrqkq:-form-item")! as HTMLInputElement).value = rating.toString();
       console.log((document))
   
   }, [rating])  */


    return (
        <div className='w-11/12 mobile:w-1/4 bg-medium-dark-blue p-4 flex flex-col rounded-3xl gap-5 '>
            <div className='relative w-full h-12 flex justify-around'>
                {
                    [...Array(parseInt(rating))].map((rate, index) => <img
                        key={index}
                        className='rounded-full h-10 w-10 mobile:h-[3.25rem] mobile:w-[3.25rem] flex items-center justify-center hover:text-white font-bold cursor-pointer transition duration-200 hover:bg-orange'
                        src='/assets/icons/star.svg'
                        alt='start icon'
                    />)
                }
            </div>

            <div className='flex justify-around'>
                {[...Array(10)].map((rate, index) => {
                    index += 1;
                    return (
                        <button
                            type='button'
                            key={index}
                            className={` ${rating === index.toString() ? chosenStyles : 'bg-gray-800 text-light-gray'
                                } rounded-full h-10 w-10 mobile:h-[3.25rem] mobile:w-[3.25rem] flex items-center justify-center hover:text-white font-bold cursor-pointer transition duration-200 hover:bg-orange text-white`}
                            onClick={() => setRating(index.toString())}
                        >
                            {index}
                        </button>
                    );
                })}
            </div>
            {/*       <button
        type='submit'
        className=' bg-orange hover:bg-white text-white hover:text-orange transition duration-200 p-3 rounded-3xl font-bold tracking-widest'
        onClick={handleSubmit}
      >
        SUBMIT
      </button> */}
            <input type="text"
                className="hidden"

                id="rating"
            />
        </div>
    );
}


export default Rating;