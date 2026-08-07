import { useEffect } from "react";
import { analyticsEvents } from "../utils/analyticsEvents";

export default function Footer() {
  useEffect(() => {
    // UTM Parameter Application to all links
    const utmData = localStorage.getItem("wevets_utm");
    if (!utmData) return;

    const utms = JSON.parse(utmData);
    const utmString = new URLSearchParams(utms).toString();

    document
      .querySelectorAll('a[href], button[data-link], [role="button"][href]')
      .forEach((el) => {
        let href = el.getAttribute("href");
        if (!href) return;

        // Ignora links de âncora e javascript:void
        if (href.startsWith("#") || href.startsWith("javascript")) return;

        const newHref = href.includes("?")
          ? href + "&" + utmString
          : href + "?" + utmString;

        el.setAttribute("href", newHref);
      });
  }, []);

  return (
    <footer className="bg-wevets-blue flex justify-center items-center py-20 px-6">
      <div className="w-full max-w-[1460px] flex flex-col gap-[60px]">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 w-full">
          {/* Logo and Social Media */}
          <div className="flex flex-col items-start gap-6 w-full md:w-[187px]">
            <a href="https://www.wevets.com.br/plano-de-saude-pet">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/483b26be38fd86c35da1217ac5f0cec92e96ef5c?width=300"
                alt="WeVets Logo"
                className="w-[150px] h-[47px]"
                loading="lazy"
                width={150}
                height={47}
              />
            </a>
            <p
              className="text-[#FBF7EF]"
              style={{
                fontFamily: "Peridot PE Variable, sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
              }}
            >
              Pro seu pet viver bem
            </p>
            <div
              className="text-[#FBF7EF]"
              style={{
                fontFamily: "Peridot PE Variable, sans-serif",
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: "18px",
              }}
            >
              <p className="font-bold">WeVets Plano de Saúde</p>
              <p className="whitespace-nowrap">Dr. Patinhas Holding S.A | CNPJ 37.078.598/0001-41</p>
              <p>Rua Cardeal Arcoverde, 1609 - Pinheiros, São Paulo - SP, 05407-002</p>
            </div>
            <div className="flex flex-col items-start gap-1">
              {/* Instagram */}
              <div className="flex items-center gap-2">
                <a
                  href="https://www.instagram.com/we.vets/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analyticsEvents.clickFooterInstagram()}
                  className="w-8 h-8 flex items-center justify-center rounded-[10px] hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_instagram)">
                    <path
                      d="M8 1.442C10.136 1.442 10.3893 1.45 11.2333 1.48867C13.4013 1.58733 14.414 2.616 14.5127 4.768C14.5513 5.61133 14.5587 5.86467 14.5587 8.00067C14.5587 10.1373 14.5507 10.39 14.5127 11.2333C14.4133 13.3833 13.4033 14.414 11.2333 14.5127C10.3893 14.5513 10.1373 14.5593 8 14.5593C5.864 14.5593 5.61067 14.5513 4.76733 14.5127C2.594 14.4133 1.58667 13.38 1.488 11.2327C1.44933 10.3893 1.44133 10.1367 1.44133 8C1.44133 5.864 1.45 5.61133 1.488 4.76733C1.58733 2.616 2.59733 1.58667 4.76733 1.488C5.61133 1.45 5.864 1.442 8 1.442ZM8 0C5.82733 0 5.55533 0.00933333 4.702 0.048C1.79667 0.181333 0.182 1.79333 0.0486667 4.70133C0.00933333 5.55533 0 5.82733 0 8C0 10.1727 0.00933333 10.4453 0.048 11.2987C0.181333 14.204 1.79333 15.8187 4.70133 15.952C5.55533 15.9907 5.82733 16 8 16C10.1727 16 10.4453 15.9907 11.2987 15.952C14.2013 15.8187 15.82 14.2067 15.9513 11.2987C15.9907 10.4453 16 10.1727 16 8C16 5.82733 15.9907 5.55533 15.952 4.702C15.8213 1.79933 14.2073 0.182 11.2993 0.0486667C10.4453 0.00933333 10.1727 0 8 0ZM8 3.892C7.46053 3.892 6.92634 3.99826 6.42794 4.2047C5.92953 4.41115 5.47667 4.71374 5.09521 5.09521C4.71374 5.47667 4.41115 5.92953 4.2047 6.42794C3.99826 6.92634 3.892 7.46053 3.892 8C3.892 8.53947 3.99826 9.07366 4.2047 9.57206C4.41115 10.0705 4.71374 10.5233 5.09521 10.9048C5.47667 11.2863 5.92953 11.5889 6.42794 11.7953C6.92634 12.0017 7.46053 12.108 8 12.108C9.08951 12.108 10.1344 11.6752 10.9048 10.9048C11.6752 10.1344 12.108 9.08951 12.108 8C12.108 6.91049 11.6752 5.8656 10.9048 5.09521C10.1344 4.32481 9.08951 3.892 8 3.892ZM8 10.6667C7.29276 10.6667 6.61448 10.3857 6.11438 9.88562C5.61428 9.38552 5.33333 8.70724 5.33333 8C5.33333 7.29276 5.61428 6.61448 6.11438 6.11438C6.61448 5.61428 7.29276 5.33333 8 5.33333C8.70724 5.33333 9.38552 5.61428 9.88562 6.11438C10.3857 6.61448 10.6667 7.29276 10.6667 8C10.6667 8.70724 10.3857 9.38552 9.88562 9.88562C9.38552 10.3857 8.70724 10.6667 8 10.6667ZM12.2707 2.77C12.1446 2.77 12.0197 2.79484 11.9032 2.8431C11.7866 2.89136 11.6808 2.9621 11.5916 3.05128C11.5024 3.14045 11.4317 3.24632 11.3834 3.36283C11.3352 3.47934 11.3103 3.60422 11.3103 3.73033C11.3103 3.85645 11.3352 3.98132 11.3834 4.09784C11.4317 4.21435 11.5024 4.32022 11.5916 4.40939C11.6808 4.49857 11.7866 4.5693 11.9032 4.61757C12.0197 4.66583 12.1446 4.69067 12.2707 4.69067C12.5254 4.69067 12.7696 4.58949 12.9497 4.40939C13.1298 4.22929 13.231 3.98503 13.231 3.73033C13.231 3.47564 13.1298 3.23137 12.9497 3.05128C12.7696 2.87118 12.5254 2.77 12.2707 2.77Z"
                      fill="#D1D5DC"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_instagram">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                  </svg>
                </a>
                <span
                  className="text-[#FBF7EF]"
                  style={{
                    fontFamily: "Peridot PE Variable, sans-serif",
                    fontSize: "12px",
                    fontWeight: 400,
                    lineHeight: "18px",
                  }}
                >
                  @we.vets
                </span>
              </div>
              {/* YouTube */}
              <div className="flex items-center gap-2">
                <a
                  href="https://www.youtube.com/channel/UCiyFmnhCh_F5BUPjmRSDpAA"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analyticsEvents.clickFooterYoutube()}
                  className="w-8 h-8 flex items-center justify-center rounded-[10px] hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.6653 4.12395C15.5749 3.78346 15.3967 3.47271 15.1484 3.22279C14.9001 2.97287 14.5905 2.79258 14.2507 2.69995C13.0033 2.36328 8 2.36328 8 2.36328C8 2.36328 2.99667 2.36328 1.74867 2.69995C1.40894 2.79274 1.09953 2.9731 0.851385 3.223C0.603241 3.4729 0.425061 3.78357 0.334667 4.12395C0 5.37995 0 7.99995 0 7.99995C0 7.99995 0 10.6199 0.334667 11.8759C0.425057 12.2164 0.603317 12.5272 0.851594 12.7771C1.09987 13.027 1.40945 13.2073 1.74933 13.2999C2.99667 13.6366 8 13.6366 8 13.6366C8 13.6366 13.0033 13.6366 14.2513 13.2999C14.5912 13.2074 14.9009 13.0271 15.1491 12.7772C15.3974 12.5273 15.5757 12.2165 15.666 11.8759C16 10.6199 16 7.99995 16 7.99995C16 7.99995 16 5.37995 15.6653 4.12395ZM6.36333 10.3786V5.62128L10.5453 7.99995L6.36333 10.3786Z"
                      fill="#D1D5DC"
                    />
                  </svg>
                </a>
                <span
                  className="text-[#FBF7EF]"
                  style={{
                    fontFamily: "Peridot PE Variable, sans-serif",
                    fontSize: "12px",
                    fontWeight: 400,
                    lineHeight: "18px",
                  }}
                >
                  @wevets
                </span>
              </div>
              {/* WhatsApp */}
              <div className="flex items-center gap-2">
                <a
                  href="https://api.whatsapp.com/send?phone=551133360600"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-[10px] hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.6915 2.2918C12.1548 0.755099 10.0881 -0.0209105 7.8948 -0.0209105C3.5348 -0.0209105 0.0314799 3.4824 0.0314799 7.8424C0.0314799 9.2624 0.4381 10.6491 1.18548 11.8491L0 16L4.3348 14.8158C5.49147 15.5024 6.83815 15.8758 8.2048 15.8758H8.20815C12.5615 15.8758 16 12.3891 16 8.0224C16.0033 5.8357 15.2282 3.8285 13.6915 2.2918ZM8.20815 14.5424C7.0348 14.5424 5.89147 14.1891 4.93815 13.5558L4.71815 13.4091L2.39815 14.0691L3.07481 11.8024L2.90815 11.5758C2.20548 10.5758 1.8248 9.3891 1.8248 8.0224C1.8248 4.6024 4.5448 1.8824 7.9648 1.8824C9.73815 1.8824 11.4215 2.5591 12.6348 3.7724C13.8482 4.9858 14.5248 6.6691 14.5215 8.4424C14.5182 11.8624 11.6281 14.5424 8.20815 14.5424Z"
                      fill="#D1D5DC"
                    />
                    <path
                      d="M11.3757 10.0625C11.2057 9.86918 10.9024 9.76918 10.5424 9.56918C10.1824 9.36918 9.04906 8.76918 8.79239 8.68584C8.53573 8.59918 8.34239 8.56251 8.14906 8.79918C7.95573 9.03584 7.42906 9.61918 7.25906 9.81251C7.09239 10.0059 6.92239 10.0292 6.68573 9.82918C5.79906 9.16251 5.24906 8.70584 4.72239 7.57584C4.52906 7.15918 5.02239 7.19584 5.48906 6.29918C5.57573 6.11584 5.53239 5.96251 5.45239 5.79584C5.37239 5.62918 4.87573 4.49584 4.63906 3.96584C4.41573 3.45918 4.18906 3.54251 4.02239 3.53584C3.86573 3.52918 3.67573 3.52918 3.48239 3.52918C3.28906 3.52918 2.95906 3.62251 2.70239 3.85918C2.44573 4.09584 1.73906 4.69584 1.73906 5.82918C1.73906 6.96251 2.71906 8.05251 2.82573 8.24584C2.93239 8.43918 4.74239 11.5259 7.60906 12.5892C8.11906 12.7692 8.51239 12.8725 8.81239 12.9425C9.31906 13.0625 9.77906 13.0359 10.1624 12.9859C10.5857 12.9292 11.4457 12.4892 11.6824 11.9792C11.9191 11.4692 11.9191 11.0459 11.8557 10.9459C11.7957 10.8525 11.5424 10.7525 11.3757 10.0625Z"
                      fill="#D1D5DC"
                    />
                  </svg>
                </a>
                <span
                  className="text-[#FBF7EF]"
                  style={{
                    fontFamily: "Peridot PE Variable, sans-serif",
                    fontSize: "12px",
                    fontWeight: 400,
                    lineHeight: "18px",
                  }}
                >
                  (11) 3336-0600
                </span>
              </div>
              {/* Email */}
              <div className="flex items-center gap-2">
                <a
                  href="mailto:plano@wevets.com.br"
                  className="w-8 h-8 flex items-center justify-center rounded-[10px] hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.66667 2.66667H13.3333C14.0667 2.66667 14.6667 3.26667 14.6667 4V12C14.6667 12.7333 14.0667 13.3333 13.3333 13.3333H2.66667C1.93333 13.3333 1.33333 12.7333 1.33333 12V4C1.33333 3.26667 1.93333 2.66667 2.66667 2.66667Z"
                      stroke="#D1D5DC"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M14.6667 4L8 8.66667L1.33333 4"
                      stroke="#D1D5DC"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <span
                  className="text-[#FBF7EF]"
                  style={{
                    fontFamily: "Peridot PE Variable, sans-serif",
                    fontSize: "12px",
                    fontWeight: 400,
                    lineHeight: "18px",
                  }}
                >
                  plano@wevets.com.br
                </span>
              </div>
            </div>

            {/* App Store and Google Play Buttons */}
            <div className="flex items-center gap-3">
              {/* App Store Button */}
              <a
                href="https://apps.apple.com/br/app/wevets-plano-de-sa%C3%BAde-pet/id6752874225"
                target="_blank"
                onClick={() => analyticsEvents.clickFooterAppIos()}
                className="flex items-center justify-center gap-2 w-[100px] h-[40px] px-2 py-2 rounded-md border border-[#A6A6A6] bg-wevets-blue hover:bg-opacity-90 transition-colors"
                style={{ cursor: "pointer", pointerEvents: "auto" }}
              >
                <svg
                  width="20"
                  height="24"
                  viewBox="0 0 20 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.7045 12.763C16.7166 11.8431 16.9669 10.9411 17.4321 10.141C17.8972 9.34093 18.5621 8.66869 19.3648 8.18687C18.8548 7.47582 18.1821 6.89066 17.4 6.47785C16.6178 6.06505 15.7479 5.83597 14.8592 5.80883C12.9635 5.61456 11.1258 6.91628 10.1598 6.91628C9.17506 6.91628 7.68776 5.82812 6.08616 5.86028C5.05021 5.89296 4.04059 6.18707 3.15568 6.71395C2.27077 7.24083 1.54075 7.98252 1.03674 8.86675C-1.14648 12.5571 0.482005 17.9808 2.57338 20.9639C3.61975 22.4246 4.84264 24.0562 6.44279 23.9984C8.00863 23.9349 8.59344 23.0235 10.4835 23.0235C12.3561 23.0235 12.9048 23.9984 14.5374 23.9616C16.2176 23.9349 17.2762 22.4944 18.2859 21.0198C19.0377 19.979 19.6162 18.8287 20 17.6115C19.0238 17.2084 18.1908 16.5337 17.6048 15.6715C17.0187 14.8093 16.7056 13.7977 16.7045 12.763Z"
                    fill="white"
                  />
                  <path
                    d="M13.6181 3.84713C14.5342 2.77343 14.9856 1.39335 14.8763 0C13.4767 0.143519 12.1838 0.796596 11.2553 1.82911C10.8013 2.33351 10.4536 2.92033 10.2321 3.55601C10.0105 4.19168 9.91951 4.86375 9.96417 5.5338C10.6642 5.54084 11.3568 5.3927 11.9897 5.10054C12.6227 4.80838 13.1794 4.37982 13.6181 3.84713Z"
                    fill="white"
                  />
                </svg>
                <span
                  className="text-white tracking-[-0.47px]"
                  style={{
                    font: '300 12px/12px "SF Compact Display", -apple-system, Roboto, Helvetica, sans-serif ',
                  }}
                >
                  App Store
                </span>
              </a>

              {/* Google Play Button */}
              <a
                href="https://play.google.com/store/apps/details?id=br.com.wevets.app"
                target="_blank"
                onClick={() => analyticsEvents.clickFooterAppAndroid()}
                className="flex items-center justify-center gap-[7px] w-[100px] h-[40px] px-2 py-2 rounded-md border border-[#A6A6A6] bg-wevets-blue hover:bg-opacity-90 transition-colors"
                style={{ cursor: "pointer", pointerEvents: "auto" }}
              >
                <svg
                  width="21"
                  height="24"
                  viewBox="0 0 21 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.80115 11.4617L0.0859375 22.0059C0.08685 22.0078 0.0868499 22.0106 0.0877623 22.0125C0.386145 23.1574 1.40813 24 2.62173 24C3.10717 24 3.5625 23.8656 3.95304 23.6305L3.98407 23.6118L14.9193 17.1593L9.80115 11.4617Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M19.6351 9.66619L19.626 9.65966L14.9048 6.86123L9.58594 11.7013L14.924 17.1582L19.6196 14.3878C20.4427 13.9324 21.002 13.045 21.002 12.0223C21.002 11.0052 20.4509 10.1225 19.6351 9.66619Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M0.0894234 1.99325C0.0310244 2.21346 0 2.44488 0 2.68376V21.3163C0 21.5552 0.0310245 21.7866 0.0903359 22.0059L10.1386 11.7313L0.0894234 1.99325Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M9.87324 12L14.901 6.85945L3.97859 0.383598C3.58166 0.140054 3.11812 8.67844e-05 2.62264 8.67844e-05C1.40904 8.67844e-05 0.385232 0.84456 0.0868495 1.99043C0.0868495 1.99136 0.0859375 1.9923 0.0859375 1.99323L9.87324 12Z"
                    fill="#34A853"
                  />
                </svg>
                <svg
                  width="74"
                  height="15"
                  viewBox="0 0 74 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M57.5181 11.4097H59.1469V0.398144H57.5181V11.4097ZM72.1888 4.36461L70.3217 9.13882H70.2658L68.328 4.36461H66.5735L69.4793 11.0371L67.8234 14.749H69.5212L74 4.36461H72.1888ZM62.9519 10.1588C62.4176 10.1588 61.6739 9.89019 61.6739 9.22338C61.6739 8.37424 62.6001 8.04833 63.4005 8.04833C64.1163 8.04833 64.4541 8.20424 64.8888 8.41652C64.7622 9.43655 63.892 10.1588 62.9519 10.1588ZM63.1483 4.12414C61.969 4.12414 60.7469 4.64825 60.2424 5.81009L61.6879 6.41876C61.9969 5.81009 62.5721 5.61102 63.1762 5.61102C64.0185 5.61102 64.8748 6.12103 64.8888 7.0283V7.14105C64.5938 6.97105 63.9627 6.71648 63.1902 6.71648C61.632 6.71648 60.0451 7.5806 60.0451 9.1952C60.0451 10.6689 61.323 11.6184 62.7546 11.6184C63.8501 11.6184 64.4541 11.1225 64.8329 10.5411H64.8888V11.3912H66.4609V7.16924C66.4609 5.21463 65.0154 4.12414 63.1483 4.12414ZM53.0821 5.70527H50.7655V1.93082H53.0821C54.2998 1.93082 54.9911 2.9482 54.9911 3.81761C54.9911 4.67115 54.2998 5.70527 53.0821 5.70527ZM53.0402 0.398144H49.1375V11.4097H50.7655V7.23795H53.0402C54.8453 7.23795 56.6199 5.91843 56.6199 3.81761C56.6199 1.71678 54.8453 0.398144 53.0402 0.398144ZM31.7583 10.1606C30.6332 10.1606 29.6913 9.21017 29.6913 7.90475C29.6913 6.58524 30.6332 5.61982 31.7583 5.61982C32.8695 5.61982 33.7406 6.58524 33.7406 7.90475C33.7406 9.21017 32.8695 10.1606 31.7583 10.1606ZM33.6289 4.98121H33.5722C33.2064 4.54166 32.5038 4.1444 31.6178 4.1444C29.7611 4.1444 28.0599 5.78983 28.0599 7.90475C28.0599 10.0047 29.7611 11.6369 31.6178 11.6369C32.5038 11.6369 33.2064 11.2396 33.5722 10.7851H33.6289V11.3251C33.6289 12.7582 32.8695 13.5246 31.6457 13.5246C30.6471 13.5246 30.0282 12.8005 29.7751 12.1901L28.3549 12.7864C28.7626 13.78 29.8458 15 31.6457 15C33.5582 15 35.1757 13.8646 35.1757 11.0978V4.37078H33.6289V4.98121ZM36.3008 11.4097H37.9323V0.397264H36.3008V11.4097ZM40.3362 7.77703C40.2943 6.32979 41.4474 5.59164 42.2766 5.59164C42.9243 5.59164 43.4725 5.91755 43.6549 6.38616L40.3362 7.77703ZM45.3989 6.52798C45.0899 5.69117 44.1472 4.1444 42.2208 4.1444C40.3083 4.1444 38.7196 5.6621 38.7196 7.89066C38.7196 9.9906 40.2943 11.6369 42.4032 11.6369C44.1053 11.6369 45.0899 10.5869 45.4976 9.97651L44.2319 9.12473C43.8103 9.74925 43.2333 10.1606 42.4032 10.1606C41.5739 10.1606 40.983 9.77744 40.6033 9.02607L45.5674 6.95343L45.3989 6.52798ZM5.8501 5.29391V6.88296H9.61836C9.50576 7.77703 9.21072 8.42974 8.76118 8.88337C8.21214 9.43743 7.35409 10.0479 5.8501 10.0479C3.52909 10.0479 1.71523 8.1602 1.71523 5.8189C1.71523 3.47672 3.52909 1.58993 5.8501 1.58993C7.10182 1.58993 8.01574 2.08673 8.69048 2.72535L9.80167 1.60403C8.85895 0.69587 7.6081 0 5.8501 0C2.67191 0 0 2.61172 0 5.8189C0 9.02607 2.67191 11.6369 5.8501 11.6369C7.56533 11.6369 8.85895 11.0688 9.8715 10.0047C10.9129 8.95472 11.2358 7.4793 11.2358 6.28663C11.2358 5.91755 11.2079 5.57754 11.1512 5.29391H5.8501ZM15.5208 10.1606C14.3957 10.1606 13.425 9.22426 13.425 7.89066C13.425 6.54207 14.3957 5.61982 15.5208 5.61982C16.6451 5.61982 17.6158 6.54207 17.6158 7.89066C17.6158 9.22426 16.6451 10.1606 15.5208 10.1606ZM15.5208 4.1444C13.4669 4.1444 11.7936 5.71936 11.7936 7.89066C11.7936 10.0479 13.4669 11.6369 15.5208 11.6369C17.5739 11.6369 19.2472 10.0479 19.2472 7.89066C19.2472 5.71936 17.5739 4.1444 15.5208 4.1444ZM23.65 10.1606C22.5249 10.1606 21.5542 9.22426 21.5542 7.89066C21.5542 6.54207 22.5249 5.61982 23.65 5.61982C24.7752 5.61982 25.745 6.54207 25.745 7.89066C25.745 9.22426 24.7752 10.1606 23.65 10.1606ZM23.65 4.1444C21.597 4.1444 19.9237 5.71936 19.9237 7.89066C19.9237 10.0479 21.597 11.6369 23.65 11.6369C25.7031 11.6369 27.3764 10.0479 27.3764 7.89066C27.3764 5.71936 25.7031 4.1444 23.65 4.1444Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Support Column */}
          <div className="flex flex-col items-start gap-4 w-full md:w-auto">
            <div
              className="text-[#FBF7EF] font-bold"
              style={{
                fontFamily: "Peridot PE Variable, sans-serif",
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              Suporte
            </div>
            <div className="flex flex-col items-start gap-2">
              <a
                href="#duvidas-frequentes"
                onClick={() => analyticsEvents.clickFooterCentralAjuda()}
                className="text-[#FBF7EF] hover:text-white transition-colors"
                style={{
                  fontFamily: "Peridot PE Variable, sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                Central de Ajuda
              </a>
            </div>
          </div>

          {/* Company Column */}
          <div className="flex flex-col items-start gap-4 w-full md:w-auto">
            <div
              className="text-[#FBF7EF] font-bold"
              style={{
                fontFamily: "Peridot PE Variable, sans-serif",
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              Empresa
            </div>
            <div className="flex flex-col items-start gap-2">
              <a
                href="https://www.wevets.com.br"
                onClick={() => analyticsEvents.clickFooterSobreNos()}
                className="text-[#FBF7EF] hover:text-white transition-colors"
                style={{
                  fontFamily: "Peridot PE Variable, sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  cursor: "pointer",
                  pointerEvents: "auto",
                }}
              >
                Sobre nós
              </a>
              <a
                href="https://www.wevets.com.br/blog"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analyticsEvents.clickFooterBlog()}
                className="text-[#FBF7EF] hover:text-white transition-colors cursor-pointer"
                style={{
                  fontFamily: "Peridot PE Variable, sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                Blog
              </a>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-col items-start gap-4 w-full md:w-auto">
            <div
              className="text-white font-bold"
              style={{
                fontFamily: "Peridot PE Variable, sans-serif",
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              Formas de pagamento
            </div>
            <div className="flex flex-col gap-3 w-[211px]">
              {/* First Row */}
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-[99.5px] h-[44px] bg-white rounded-[10px]">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/db8c2eea5b3edb4c9102377c889194712e04caef?width=68"
                    alt="Visa"
                    className="h-[11px] object-contain"
                    width="68"
                    height="11"
                  />
                </div>
                <div className="flex items-center justify-center w-[99.5px] h-[44px] bg-white rounded-[10px]">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/90e6b47d8c7da314b065a63019a7041715caa068?width=62"
                    alt="Mastercard"
                    className="h-[24px] object-contain"
                    width="62"
                    height="24"
                  />
                </div>
              </div>
              {/* Second Row */}
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-[99.5px] h-[44px] bg-white rounded-[10px]">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/58b1dad482c058359e3f79d0f44f8df64a99ea47?width=70"
                    alt="American Express"
                    className="w-[35px] h-[13px] object-contain"
                  />
                </div>
                <div className="flex items-center justify-center w-[99.5px] h-[44px] bg-white rounded-[10px]">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/8d0e727fc82e7d34e1652a480b871114930d1168?width=68"
                    alt="Elo"
                    className="w-[34px] h-[13px] object-contain"
                  />
                </div>
              </div>
              {/* Google Safe Browsing Seal */}
              <a
                href="https://transparencyreport.google.com/safe-browsing/search?url=www.wevets.com.br%2Fplano-de-saude-pet"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center mt-4"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fad3b24e0eebc41a888274aae2381ca13%2F7399d8a94052415ab5c57fc522d81db9?format=webp&width=800&height=336"
                  alt="Navegação Segura Google - Selo do Google Safe Browser"
                  className="h-[60px] object-contain"
                  width="214"
                  height="60"
                />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-8">
          {/* Divider */}
          <div className="h-[1px] bg-white/10 w-full"></div>

          {/* Copyright and Legal Links */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <p
              className="text-[#D1D5DC]"
              style={{
                fontFamily: "Peridot PE Variable, sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
              }}
            >
              © 2026 WeVets. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-7">
              <a
                href="https://wevets.sydle.one/api/1/main/landingPage/NewLoginConfig/getFileUseTerm/68cd49662d4b8f2152b6b0fa/"
                target="_blank"
                className="text-[#D1D5DC] hover:text-white transition-colors"
                style={{
                  fontFamily: "Peridot PE Variable, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "21px",
                  cursor: "pointer",
                  pointerEvents: "auto",
                }}
              >
                Termos de Uso
              </a>
              <a
                href="https://wevets.sydle.one/api/1/main/landingPage/NewLoginConfig/getFilePrivacyPolicy/68cd49662d4b8f2152b6b0fa/"
                target="_blank"
                className="text-[#D1D5DC] hover:text-white transition-colors"
                style={{
                  fontFamily: "Peridot PE Variable, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "21px",
                  cursor: "pointer",
                  pointerEvents: "auto",
                }}
              >
                Política de Privacidade
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
