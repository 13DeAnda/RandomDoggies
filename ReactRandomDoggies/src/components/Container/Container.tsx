import React, { useState, useEffect } from 'react';
import './Container.css';
import { getRandomDog, getDog } from '../../DogsService/DogService';
import { IDog } from '../../Interfaces/IDog';
import ImageDisplayer from '../ImageDisplayer/ImageDisplayer';
import { Card } from '@mui/material';
export default function Container() {
    const [mainDog, setMainDog] = useState<IDog[]>();
    const [linkedDogs, setLinkedDogs] = useState<IDog[]>();

    const retriveDogs = async () => {
        const resonseSingle = await getRandomDog(1);
        const responseMany = await getRandomDog(10);

        const transformedSingle = transformDogData(resonseSingle.data.message);
        const transformedMany = transformDogData(responseMany.data.message);

        setMainDog(transformedSingle);
        setLinkedDogs(transformedMany);
    };

    const getSpecificDog = async (link: string) => {
        const breed = link.split('/')[4].split('-')[0];
        const response = await getDog(breed);
        if (response.status === 200) {
            const transformedSingle = transformDogData([response.data.message]);
            setMainDog(transformedSingle);
        }
    };
    const transformDogData = (links: string[]) => {
        const transformed = [];

        for (const link of links) {
            const breed = link.split('/')[4].split('-').join(' ');
            transformed.push({ breed: breed, image: link });
        }

        return transformed;
    };

    useEffect(() => {
        retriveDogs();
    }, []);

    return (
        <div className="Container">
            <h3>Random Dogs!</h3>
            <div className="mainDog">{mainDog ? <ImageDisplayer dog={mainDog[0]} mainPicture={true} /> : null}</div>
            <div className="links">
                {linkedDogs &&
                    linkedDogs.map((dog: IDog, index: number) => (
                        <Card
                            variant="outlined"
                            className="link"
                            key={`dogImage_4${index}`}
                            sx={{ maxWidth: 345 }}
                            onClick={() => getSpecificDog(dog.image)}
                        >
                            <ImageDisplayer dog={dog} />
                        </Card>
                    ))}
            </div>
        </div>
    );
}
