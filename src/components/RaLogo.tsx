import Box from '@mui/material/Box'
import { SxProps } from '@mui/system'

export default function RaLogo({ sx = {} }: { sx?: SxProps }) {
  return (
    <Box sx={{ ...sx, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox='0 0 512.000000 512.000000'>
        <g
          transform='translate(0.000000,512.000000) scale(0.100000,-0.100000)'
          fill='currentColor'
          stroke='none'
        >
          <path
            d='M1405 3978 c-211 -18 -399 -77 -538 -168 -167 -108 -268 -253 -331
-471 -49 -172 -49 -175 -53 -1221 l-4 -988 310 0 311 0 0 873 c0 956 2 989 59
1145 64 176 170 274 356 328 51 15 122 18 460 23 l400 6 3 243 2 242 -437 -1
c-241 -1 -483 -6 -538 -11z'
          />
          <path
            d='M2832 3748 l3 -243 470 -5 470 -5 67 -33 c79 -39 129 -92 160 -171
18 -47 22 -82 26 -218 l4 -163 -668 0 c-736 -1 -770 -3 -892 -60 -135 -63
-223 -155 -296 -311 -66 -138 -96 -305 -96 -524 0 -486 150 -758 470 -856 l75
-23 800 -4 c547 -2 820 0 863 8 143 25 240 87 296 190 62 114 60 76 64 995 2
555 0 876 -7 945 -38 363 -226 607 -536 692 -78 21 -99 22 -678 26 l-597 3 2
-243z m1198 -1678 c0 -388 -1 -392 -63 -430 -31 -19 -54 -20 -538 -20 l-505 0
-51 25 c-90 45 -134 127 -153 284 -20 159 12 328 75 403 75 89 60 87 688 88
l547 0 0 -350z'
          />
        </g>
      </svg>
    </Box>
  )
}
