import OrderModal from './OrderModal'

export default function UrlContext() {
    let context;

    onhashchange = () => {
        const href = window.location.hash;
        console.log(href + ' h');
        const trimUrl = href.split('/')
        console.log(trimUrl);
        if (trimUrl[0] === '#order') {
            console.log('true');
            context = <OrderModal />
        }
    }
    console.log(context);
    return (
        <div>
            {context}
        </div>
    )
}