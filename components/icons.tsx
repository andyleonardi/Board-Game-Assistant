
import React from 'react';

export const Icon: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      {children}
    </svg>
  );
};

export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 17.25z" />
    </Icon>
);

export const LinkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </Icon>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.312-2.312L12.75 18l1.178-.398a3.375 3.375 0 002.312-2.312L16.5 14.25l.398 1.178a3.375 3.375 0 002.312 2.312L20.25 18l-1.178.398a3.375 3.375 0 00-2.312 2.312z" />
    </Icon>
);

export const LoadingSpinnerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-4.991-2.696a4.126 4.126 0 01-2.258-2.258c-.287-.589-.287-1.288 0-1.877.287-.588.793-1.043 1.385-1.385.592-.342 1.288-.342 1.877 0 .592.342 1.098.797 1.385 1.385.287.589.287 1.288 0 1.877-.287.588-.793-1.043-1.385-1.385a4.126 4.126 0 01-2.258-2.258z" />
    </Icon>
);

export const BotIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m15-3.75H21m-9 3.75h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0-3.75h.008v.008H12v-.008zm0-3.75h.008v.008H12V7.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a8.25 8.25 0 004.47-15.31A8.25 8.25 0 003.53 5.69 8.25 8.25 0 0012 21z" />
    </Icon>
);


export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </Icon>
);

export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </Icon>
);

export const DocumentIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </Icon>
);

export const XCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </Icon>
);

export const BookOpenIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6-2.292m0 0a8.966 8.966 0 00-6 2.292m6-2.292v14.25" />
    </Icon>
);

export const HashtagIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h13.5m-13.5 7.5h13.5m-1.5-15l-3 15m-2.25-15l-3 15" /></Icon>
);

export const PuzzlePieceIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.75a4.5 4.5 0 014.5 4.5v4.5m-4.5-4.5h-6v-6m6 6v6m-6-6h-1.5a4.5 4.5 0 00-4.5 4.5v4.5m0 0h6m-6 0v-6m6 6v-6m0 6h6m-6 0v6m6-6h1.5a4.5 4.5 0 004.5-4.5v-4.5m-4.5 4.5h-6" /></Icon>
);

export const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 001.056 4.636 1.125 1.125 0 01-1.125 1.125H4.125a1.125 1.125 0 01-1.125-1.125A9.75 9.75 0 002.25 18.75h-1.5a.75.75 0 01-.75-.75V11.25a.75.75 0 01.75-.75h1.5a9.75 9.75 0 009.75-9.75A9.75 9.75 0 0012 1.5a9.75 9.75 0 00-2.25 18.563M16.5 18.75v-5.25a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v5.25m3 0a9.75 9.75 0 004.5-4.5-1.125 1.125 0 011.125-1.125h.375a1.125 1.125 0 011.125 1.125 9.75 9.75 0 004.5 4.5h1.5a.75.75 0 01.75.75v6.75a.75.75 0 01-.75.75h-1.5a9.75 9.75 0 00-9.75-9.75" /></Icon>
);

export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></Icon>
);

export const ArrowPathIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-4.991-2.696a4.125 4.125 0 01-5.834 0c-1.614-1.613-1.614-4.23 0-5.833.796-.796 1.847-1.231 2.917-1.231s2.121.435 2.917 1.231c.796.796 1.231 1.847 1.231 2.917s-.435 2.121-1.231 2.917-1.847 1.231-2.917 1.231z" /></Icon>
);

export const ForwardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></Icon>
);

export const ExclamationTriangleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" /></Icon>
);

export const LightBulbIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.184m-1.5.184a6.01 6.01 0 01-1.5-.184m3.75 7.482a4.5 4.5 0 00-9 0M12 6.75a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5z" /></Icon>
);

export const SaveIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.75A2.25 2.25 0 004.5 6v12a2.25 2.25 0 002.25 2.25h10.5A2.25 2.25 0 0019.5 18V9.75l-4.5-4.5M9 3.75V9h6" />
    </Icon>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </Icon>
);

export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></Icon>
);

export const PencilIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </Icon>
);

export const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></Icon>
);

export const XMarkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></Icon>
);

export const ChevronDoubleLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" /></Icon>
);

export const ChevronDoubleRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 4.5l7.5 7.5-7.5 7.5m6-15l7.5 7.5-7.5 7.5" /></Icon>
);
