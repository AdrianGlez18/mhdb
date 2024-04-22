"use client";

import React from 'react'
import { Button } from '../ui/button';
import { addMovieToCollection } from '@/lib/actions/movieCollection.actions';

const AddMovieButton = ({userId, newMovie}: any) => {
  return (
    <Button className="my-4" onClick={(e: any) => addMovieToCollection(userId!, newMovie)} > Add to list </Button>
  )
}

export default AddMovieButton