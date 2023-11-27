import { useEffect, useState } from "preact/hooks";

interface Props {
    message: string;
}
const Toast = (props: Props) => {
    const [toastClass, setToastClass] = useState("");

    useEffect(() => {
        if (props.message && props.message != "") {
            setToastClass("c-toast--active");
        } else {
            setToastClass("");
        }
    }, [props.message])

    return <div class={`c-toast ${toastClass}`}>
        <div class="c-toast__message">
            {props.message}
        </div>
    </div>
}

export default Toast;