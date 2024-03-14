import Box, { BoxProps } from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import { forwardRef, useMemo } from "react";

import { RouterLink } from "@/routes/components";

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
    disabledLink?: boolean;
    showSingleLogo?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
    ({ disabledLink = false, showSingleLogo, sx, ...other }, ref) => {
        const theme = useTheme();

        const PRIMARY_LIGHT = theme.palette.primary.light;

        const PRIMARY_MAIN = theme.palette.primary.main;

        const PRIMARY_DARK = theme.palette.primary.dark;

        const PRIMARY_DARKER = theme.palette.primary.darker;

        const singleLogo = useMemo(
            () => (
                <Box
                    ref={ref}
                    component="div"
                    sx={{
                        width: 40,
                        height: 40,
                        display: "inline-flex",
                        ...sx,
                    }}
                    {...other}
                >
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 163 181"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M113.701 49.5349C107.358 46.4861 100.139 44.747 92.361 44.747C65.1358 44.747 44.7677 66.0511 44.7677 90.257C44.7677 114.463 65.1358 135.767 92.361 135.767C104.686 135.767 115.606 131.401 123.867 124.376L162.365 149.111C145.428 168.317 120.348 180.476 92.361 180.476C41.3513 180.476 0 140.084 0 90.257C0 40.4304 41.3513 0.0378418 92.361 0.0378418C113.501 0.0378418 132.983 6.97577 148.549 18.6478L113.701 49.5349Z"
                            fill={PRIMARY_LIGHT}
                        />
                        <path
                            d="M20.8968 67.9824C16.5644 56.8051 16.5644 44.9067 19.0912 35.1716C31.0052 16.0621 46.8902 7.40869 67.8299 3.08203C59.1652 13.1776 51.5842 48.1517 48.696 71.588C48.696 71.588 42.1975 86.7314 46.5298 102.235C22.7019 79.8808 20.8968 67.9824 20.8968 67.9824Z"
                            fill={PRIMARY_MAIN}
                        />
                        <path
                            d="M78.6615 46.7095C83.7159 35.8928 101.045 12.8171 127.039 6.6876C115.847 0.918729 88.0482 -3.04749 67.8308 3.082C55.9166 10.6538 39.6701 20.0283 40.7534 62.9346C40.7534 62.9346 41.8365 75.1936 45.8078 80.2414C48.335 71.2275 50.5013 68.7036 50.5013 68.7036C57.7219 56.084 69.2749 49.594 78.6615 46.7095Z"
                            fill={PRIMARY_DARK}
                        />
                        <path
                            d="M67.8757 51.3968C75.4576 32.2873 104.848 6.01157 117.123 3.1272C134.734 7.85948 148.701 18.5864 148.701 18.5864L113.681 49.5944C96.7128 43.4646 86.2884 44.5459 67.8757 51.3968Z"
                            fill={PRIMARY_DARKER}
                        />
                    </svg>
                </Box>
            ),
            [PRIMARY_DARK, PRIMARY_DARKER, PRIMARY_LIGHT, PRIMARY_MAIN, other, ref, sx]
        );

        const fullLogo = useMemo(
            () => (
                <Box
                    ref={ref}
                    component="div"
                    sx={{
                        width: 135,
                        height: 45,
                        display: "inline-flex",
                        ...sx,
                    }}
                    {...other}
                >
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 531 182"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M114.202 50.1065C107.858 47.0576 100.639 45.3185 92.8611 45.3185C65.6359 45.3185 45.2677 66.6226 45.2677 90.8285C45.2677 115.035 65.6359 136.339 92.8611 136.339C105.186 136.339 116.106 131.972 124.367 124.947L162.865 149.682C145.928 168.889 120.848 181.048 92.8611 181.048C41.8514 181.048 0.500061 140.655 0.500061 90.8285C0.500061 41.002 41.8514 0.609375 92.8611 0.609375C114.002 0.609375 133.483 7.54731 149.05 19.2194L114.202 50.1065Z"
                            fill={PRIMARY_LIGHT}
                        />
                        <path
                            d="M21.3969 68.5539C17.0644 57.3766 17.0644 45.4782 19.5913 35.7432C31.5053 16.6336 47.3903 7.98022 68.33 3.65356C59.6653 13.7491 52.0843 48.7233 49.1961 72.1595C49.1961 72.1595 42.6975 87.3029 47.0299 102.807C23.2019 80.4523 21.3969 68.5539 21.3969 68.5539Z"
                            fill={PRIMARY_MAIN}
                        />
                        <path
                            d="M79.1615 47.2811C84.2159 36.4643 101.545 13.3886 127.539 7.25914C116.348 1.49026 88.5483 -2.47596 68.3309 3.65353C56.4167 11.2253 40.1702 20.5998 41.2534 63.5062C41.2534 63.5062 42.3366 75.7651 46.3078 80.8129C48.835 71.799 51.0014 69.2751 51.0014 69.2751C58.222 56.6556 69.775 50.1655 79.1615 47.2811Z"
                            fill={PRIMARY_DARK}
                        />
                        <path
                            d="M68.3758 51.9684C75.9576 32.8588 105.348 6.58311 117.623 3.69873C135.234 8.43102 149.201 19.158 149.201 19.158L114.181 50.1659C97.2129 44.0361 86.7885 45.1175 68.3758 51.9684Z"
                            fill={PRIMARY_DARKER}
                        />
                        <path
                            d="M170.184 87.2878C170.184 82.6986 171.119 78.6964 172.99 75.2812C174.86 71.8126 177.451 69.1445 180.764 67.2768C184.077 65.3558 187.87 64.3953 192.145 64.3953C197.649 64.3953 202.19 65.7827 205.77 68.5575C209.404 71.279 211.835 75.1211 213.064 80.0838H200.961C200.32 78.1628 199.225 76.6686 197.675 75.6014C196.179 74.4808 194.309 73.9205 192.065 73.9205C188.859 73.9205 186.321 75.0944 184.451 77.4424C182.581 79.737 181.646 83.0188 181.646 87.2878C181.646 91.5034 182.581 94.7852 184.451 97.1332C186.321 99.4278 188.859 100.575 192.065 100.575C196.607 100.575 199.572 98.5473 200.961 94.4917H213.064C211.835 99.2944 209.404 103.11 205.77 105.938C202.137 108.766 197.595 110.18 192.145 110.18C187.87 110.18 184.077 109.246 180.764 107.379C177.451 105.458 174.86 102.79 172.99 99.3744C171.119 95.9058 170.184 91.877 170.184 87.2878ZM232.505 71.9994C233.947 69.6515 235.817 67.8105 238.115 66.4764C240.466 65.1423 243.138 64.4753 246.13 64.4753V76.2417H243.164C239.638 76.2417 236.966 77.0689 235.149 78.7231C233.386 80.3773 232.505 83.2589 232.505 87.3678V109.46H221.284V65.1156H232.505V71.9994ZM294.964 86.3273C294.964 87.9281 294.857 89.3689 294.644 90.6496H262.183C262.451 93.8514 263.573 96.3594 265.55 98.1738C267.527 99.9881 269.958 100.895 272.843 100.895C277.011 100.895 279.976 99.1076 281.74 95.5323H293.842C292.56 99.8013 290.102 103.323 286.468 106.098C282.835 108.82 278.373 110.18 273.084 110.18C268.809 110.18 264.962 109.246 261.542 107.379C258.176 105.458 255.531 102.763 253.607 99.2944C251.737 95.8258 250.802 91.8236 250.802 87.2878C250.802 82.6986 251.737 78.6697 253.607 75.2012C255.478 71.7326 258.096 69.0645 261.462 67.1968C264.828 65.3291 268.702 64.3953 273.084 64.3953C277.305 64.3953 281.072 65.3024 284.384 67.1167C287.751 68.9311 290.342 71.5191 292.159 74.881C294.029 78.1895 294.964 82.0049 294.964 86.3273ZM283.343 83.1255C283.289 80.2439 282.247 77.9493 280.217 76.2417C278.186 74.4808 275.702 73.6003 272.763 73.6003C269.984 73.6003 267.633 74.4541 265.71 76.1617C263.84 77.8159 262.691 80.1372 262.264 83.1255H283.343ZM300.269 87.1277C300.269 82.6452 301.151 78.6697 302.914 75.2012C304.731 71.7326 307.162 69.0645 310.207 67.1968C313.307 65.3291 316.753 64.3953 320.547 64.3953C323.859 64.3953 326.745 65.0623 329.203 66.3963C331.714 67.7304 333.718 69.4113 335.214 71.4391V65.1156H346.515V109.46H335.214V102.976C333.771 105.058 331.767 106.792 329.203 108.179C326.691 109.513 323.779 110.18 320.466 110.18C316.726 110.18 313.307 109.22 310.207 107.299C307.162 105.378 304.731 102.683 302.914 99.2143C301.151 95.6924 300.269 91.6635 300.269 87.1277ZM335.214 87.2878C335.214 84.5663 334.68 82.245 333.611 80.324C332.542 78.3496 331.1 76.8554 329.283 75.8415C327.466 74.7743 325.516 74.2406 323.432 74.2406C321.348 74.2406 319.425 74.7476 317.661 75.7615C315.898 76.7754 314.455 78.2695 313.333 80.2439C312.265 82.165 311.73 84.4596 311.73 87.1277C311.73 89.7958 312.265 92.1438 313.333 94.1716C314.455 96.146 315.898 97.6668 317.661 98.7341C319.478 99.8013 321.402 100.335 323.432 100.335C325.516 100.335 327.466 99.828 329.283 98.8141C331.1 97.7469 332.542 96.2527 333.611 94.3316C334.68 92.3572 335.214 90.0093 335.214 87.2878ZM370.538 74.3207V95.7724C370.538 97.2666 370.886 98.3605 371.58 99.0542C372.328 99.6946 373.557 100.015 375.267 100.015H380.477V109.46H373.424C363.966 109.46 359.237 104.871 359.237 95.6924V74.3207H353.948V65.1156H359.237V54.1496H370.538V65.1156H380.477V74.3207H370.538ZM429.824 86.3273C429.824 87.9281 429.717 89.3689 429.503 90.6496H397.043C397.31 93.8514 398.432 96.3594 400.409 98.1738C402.386 99.9881 404.817 100.895 407.703 100.895C411.87 100.895 414.836 99.1076 416.599 95.5323H428.702C427.419 99.8013 424.961 103.323 421.328 106.098C417.695 108.82 413.233 110.18 407.943 110.18C403.669 110.18 399.822 109.246 396.402 107.379C393.036 105.458 390.391 102.763 388.467 99.2944C386.597 95.8258 385.662 91.8236 385.662 87.2878C385.662 82.6986 386.597 78.6697 388.467 75.2012C390.337 71.7326 392.955 69.0645 396.322 67.1968C399.688 65.3291 403.562 64.3953 407.943 64.3953C412.164 64.3953 415.931 65.3024 419.244 67.1167C422.61 68.9311 425.202 71.5191 427.019 74.881C428.889 78.1895 429.824 82.0049 429.824 86.3273ZM418.202 83.1255C418.149 80.2439 417.107 77.9493 415.076 76.2417C413.046 74.4808 410.561 73.6003 407.623 73.6003C404.844 73.6003 402.493 74.4541 400.57 76.1617C398.699 77.8159 397.551 80.1372 397.123 83.1255H418.202ZM443.705 59.8328C441.728 59.8328 440.071 59.2191 438.735 57.9917C437.453 56.711 436.812 55.1369 436.812 53.2692C436.812 51.4015 437.453 49.854 438.735 48.6266C440.071 47.3459 441.728 46.7056 443.705 46.7056C445.682 46.7056 447.311 47.3459 448.594 48.6266C449.929 49.854 450.597 51.4015 450.597 53.2692C450.597 55.1369 449.929 56.711 448.594 57.9917C447.311 59.2191 445.682 59.8328 443.705 59.8328ZM449.235 65.1156V109.46H438.014V65.1156H449.235ZM480.678 74.3207H472.904V109.46H461.523V74.3207H456.474V65.1156H461.523V62.8744C461.523 57.4314 463.072 53.4292 466.171 50.8678C469.271 48.3064 473.946 47.1058 480.197 47.2659V56.711C477.472 56.6577 475.576 57.1113 474.507 58.0718C473.438 59.0323 472.904 60.7666 472.904 63.2746V65.1156H480.678V74.3207ZM530.429 65.1156L502.938 130.431H490.996L500.614 108.339L482.821 65.1156H495.404L506.865 96.0926L518.487 65.1156H530.429Z"
                            fill={theme.palette.text.primary}
                        />
                    </svg>
                </Box>
            ),
            [
                PRIMARY_DARK,
                PRIMARY_DARKER,
                PRIMARY_LIGHT,
                PRIMARY_MAIN,
                other,
                ref,
                sx,
                theme.palette.text.primary,
            ]
        );

        const logo = useMemo(
            () => (showSingleLogo ? singleLogo : fullLogo),
            [fullLogo, showSingleLogo, singleLogo]
        );

        if (disabledLink) {
            return logo;
        }

        return (
            <Link component={RouterLink} href="/" sx={{ display: "contents" }}>
                {logo}
            </Link>
        );
    }
);

Logo.displayName = "Logo";

export default Logo;
