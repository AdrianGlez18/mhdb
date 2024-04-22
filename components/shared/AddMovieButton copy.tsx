"use client";

import React from 'react'
import { Button } from '../ui/button';
import { addMovieToCollection, addMovieToWishlist } from '@/lib/actions/movieCollection.actions';
import { checkIfWishlisted } from '@/lib/validations';
import { useToast } from '../ui/use-toast';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const AddMovieToWishlistButton = ({  userId, newMovie }: any) => {

  const { toast } = useToast();

  if (!userId) redirect("/sign-in");
  const addToWishlist = async () => {
    const isWishlisted = await checkIfWishlisted(userId, newMovie.tmdbId);

    if (!isWishlisted) {

      const result = await addMovieToWishlist(userId, newMovie);

      toast({
        title: 'Added successfully',
        description: 'Movie added to wishlist',
        duration: 5000,
        className: 'success-toast'
      })
    } else {
      toast({
        title: 'Already wishlisted',
        description: 'Movie already in your wishlist',
        duration: 5000,
        className: 'success-toast'
      })
    }
  }
  return (
    <Button
      type="button"
      className="card-button w-full bg-green-300 p-3"
      onClick={() => addToWishlist()}
    ><img src="/assets/icons/add-wishlist.png" alt="Add to wishlist" aria-label='Add to wishlist' height={20} width={20} />
    </Button>
  )
}

export default AddMovieToWishlistButton