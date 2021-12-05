import {Box, Center, Image} from '@chakra-ui/react'
interface Props {
    size?: string;
}
const PriceMeLogo = (props: Props) => {
return (
    <Box boxSize={props.size || '92px'}>
        <Image src='/priceme_logo.png' alt='PriceMe Logo' />
    </Box>
    );
}
export default PriceMeLogo;
