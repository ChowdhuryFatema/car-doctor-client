import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import { axiosSecure } from "../../../hooks/useAxiosSecure";


const Services = () => {
    const [services, setServices] = useState([]);
    const [asc, setAsc] = useState(true);
    const [search, setSearch] = useState("")

    const handleSearch = e => {
        e.preventDefault();
        const searchText = e.target.search.value;
        setSearch(searchText);
    }


    useEffect(() => {
        // fetch('https://car-doctor-server-seven-lemon.vercel.app/services')
        //     .then(res => res.json())
        //     .then(data => setServices(data));

        axiosSecure(`/services?sort=${asc ? 'asc' : 'desc'}&search=${search}`)
            .then(data => {
                setServices(data.data)
            })
    }, [asc, search])

    return (
        <div className="my-20 container mx-auto px-5">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-orange-600">Our Services</h3>
                <h2 className="text-5xl">Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which do not look even slightly believable. </p>

                <div onSubmit={handleSearch} className="flex justify-center gap-5 items-center">
                    <form className="mt-3">
                        <input type="text" name="search" placeholder="Search" className="outline-none border p-[10px] rounded-sm" />
                        <button type="submit" className="btn rounded-none -ml-2">Search</button>
                    </form>

                    <button onClick={() => setAsc(!asc)} className="btn btn-secondary mt-3">
                        {asc ? 'Price: High to Low' : 'Price: Low to High'}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;