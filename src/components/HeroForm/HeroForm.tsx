import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseName,chooseDescription,chooseComicsAppearedIn,chooseSuperPower,chooseDateCreated } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { server_calls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface HeroFormProps {
    id?:string;
    data?:{}
}

interface HeroState {
    name: string;
    description: string;
    comics_appeared_in: number;
    super_power: string;
    date_created: number;
}

export const HeroForm = (props:HeroFormProps) => {

    const dispatch = useDispatch();
    let { heroData, getData } = useGetData();
    const store = useStore()
    const name = useSelector<HeroState>(state => state.name)
    const description = useSelector<HeroState>(state => state.description)
    const comics_appeared_in = useSelector<HeroState>(state => state.comics_appeared_in)
    const super_power = useSelector<HeroState>(state => state.super_power)
    const date_created = useSelector<HeroState>(state => state.date_created)
    const { register, handleSubmit } = useForm({ })

    const onSubmit = (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            server_calls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))
            dispatch(chooseDescription(data.description))
            dispatch(chooseComicsAppearedIn(data.comics_appeared_in))
            dispatch(chooseSuperPower(data.super_power))
            dispatch(chooseDateCreated(data.date_created))
            
            server_calls.create(store.getState())
            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="description">Price</label>
                    <Input {...register('description')} name="description" placeholder="Description"/>
                </div>
                <div>
                    <label htmlFor="comics_appeared_in">Description</label>
                    <Input {...register('comics_appeared_in')} name="comics_appeared_in" placeholder="Description"/>
                </div>
                <div>
                    <label htmlFor="super_power">Super Power</label>
                    <Input {...register('super_power')} name="super_power" placeholder="Super Power"/>
                </div>
                <div>
                    <label htmlFor="date_created">Date Created</label>
                    <Input {...register('date_created')} name="date_created" placeholder="Date Created"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}