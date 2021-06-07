import { getRandomAvatar } from "@fractalsoftware/random-avatar-generator";

export default function randomAvatar() {
    const avatar = getRandomAvatar();
    const inlineAvatar = <img src={`data:image/svg+xml;base64,${btoa(avatar)}`} alt='avatar'/>
    return inlineAvatar;
}
