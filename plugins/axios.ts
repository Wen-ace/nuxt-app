import { NuxtState } from "@nuxt/types/app";
import { NuxtRouteConfig } from "@nuxt/types/config/router";
import { NuxtAxiosInstance } from "@nuxtjs/axios";


export default function ({$axios, store, route}: {
    $axios: NuxtAxiosInstance,
    store: NuxtState,
    route: NuxtRouteConfig,
}) {
    $axios.defaults.withCredentials = true;
    $axios.onRequest(config => {
        console.log(config)
        return config
    });
    
    $axios.onResponse(resp => {
        const data = resp.data;

        const code = data.code;

        if (code !== 0) {
            return Promise.reject(resp);
        }else {
            return Promise.resolve(resp);
        }
    });

    $axios.onError(error => {


        console.log(error.response)
    })
}