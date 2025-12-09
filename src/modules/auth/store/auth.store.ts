import {create} from "zustand/react";
import {AUTH_STORE_ACTIONS, type AuthStoreState} from "./auth.store.types.ts";
import {createJSONStorage, devtools, persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";

export const useAuthStore = create<AuthStoreState>()(
    devtools(
        immer(
            persist(
                (set): AuthStoreState => ({
                    token: null,
                    addToken: (newToken: string) => {
                        set(
                            (state) => {
                                state.token = newToken;
                            },
                            undefined,
                            AUTH_STORE_ACTIONS.addToken
                        )
                    }
                }),
                {
                    name: 'auth',
                    storage: createJSONStorage(() => localStorage),
                    partialize: (state) => ({
                        token: state.token,
                    })
                }
            )
        )
    )
)