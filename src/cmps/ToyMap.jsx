
import { AdvancedMarker, APIProvider, Pin, Map } from '@vis.gl/react-google-maps';
import { useState } from 'react';

const API_KEY = 'AIzaSyBnM5BaPSzdJ5EjQd7ahCl4reOsr4E4hnA'
//TODO Problem with google API

export function ToyMap() {

    const storeBranches = {
        netanya: { lat: 32.326523989924375, lng: 34.86173280514777 },
        telAviv: { lat: 32.074085398257566, lng: 34.791426153957545 },
        givatayim: { lat: 32.066582067000994, lng: 34.81032479142754 },
        jerusalem: { lat: 31.7850172064711, lng: 35.21313338629584 },
    }

    const [coords, setCoords] = useState(storeBranches.netanya)
    const [selectedBranch, setSelectedBrannch] = useState('Netanya')


    function onBranchClick(branch) {

        switch (branch) {
            case 'Netanya':
                setCoords(storeBranches.netanya)
                setSelectedBrannch('Netanya')
                break;

            case 'TelAviv':
                setCoords(storeBranches.telAviv)
                setSelectedBrannch('TelAviv')
                break;

            case 'Givatayim':
                setCoords(storeBranches.givatayim)
                setSelectedBrannch('Givatayim')
                break;

            case 'Jerusalem':
                setCoords(storeBranches.jerusalem)
                setSelectedBrannch('Jerusalem')
                break;

            default:
                break;
        }
    }



    return (
        <section className='toy-map'>
            <h2>Our branches</h2>

            <APIProvider apiKey={API_KEY}>
                <Map
                    center={coords}
                    defaultZoom={15}
                    mapId="DEMO_MAP_ID"
                >
                    <AdvancedMarker position={coords} />
                </Map>
            </APIProvider>

            <section className='btn branches-btn-container'>
                <button className={selectedBranch === 'Netanya' ? 'btn active' : 'btn'} onClick={() => onBranchClick('Netanya')}>Netanya</button>
                <button className={selectedBranch === 'TelAviv' ? 'btn active' : 'btn'} onClick={() => onBranchClick('TelAviv')}>Tel-Aviv</button>
                <button className={selectedBranch === 'Givatayim' ? 'btn active' : 'btn'} onClick={() => onBranchClick('Givatayim')}>Givatayim</button>
                <button className={selectedBranch === 'Jerusalem' ? 'btn active' : 'btn'} onClick={() => onBranchClick('Jerusalem')}>Jerusalem</button>
            </section>
        </section>
    );
}
