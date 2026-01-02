import type { UserInterface } from "../../../users/interfaces";

export default interface SessionInterface {
    token: string;
    user: UserInterface;
    access_token?: string;
}
