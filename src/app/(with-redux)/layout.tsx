"use client";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {me} from "@/api/user-api";
import {authenticate} from "@/slices/user";


export default function Layout(
    {
        children,
    }: {
        children: React.ReactNode;
    }) {

    const dispatch = useDispatch();

    useEffect(() => {
        me()
            .then((response) => {
                // @ts-ignore
                dispatch(authenticate(response.data))
            })
            .catch(() => console.error("Not authenticated"));
    }, [dispatch]);

    return children
}