
import React, { useState, useEffect } from 'react';
import { TeachNote, ActionSummary } from '../types';
import { HashtagIcon, PuzzlePieceIcon, TrophyIcon, CheckCircleIcon, ArrowPathIcon, ForwardIcon, ExclamationTriangleIcon, LightBulbIcon, SaveIcon, PencilIcon, CheckIcon, XMarkIcon, TrashIcon, PlusIcon } from './icons';

interface TeachNoteDisplayProps {
  teachNote: TeachNote | null;
  isLoading: boolean;
  onUpdateNote: (updatedNote: TeachNote) => void;
  onSave?: () => void;
}

const Section: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; isEditing?: boolean; onAdd?: () => void; addLabel?: string;}> = ({ icon, title, children, isEditing, onAdd, addLabel }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-6 h-6 text-cyan-400 mt-1">{icon}</div>
        <div className="flex-grow">
            <h3 className="font-semibold text-lg text-slate-100">{title}</h3>
            <div className="text-slate-300 mt-2 space-y-2">{children}</div>
            {isEditing && onAdd && (
                <button onClick={onAdd} className="mt-2 flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                    <PlusIcon className="w-4 h-4" />
                    {addLabel || "Add Item"}
                </button>
            )}
        </div>
    </div>
);


const BulletList: React.FC<{ items: string[] }> = ({ items }) => (
    <ul className="list-disc list-inside space-y-1">
        {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
);

const ActionList: React.FC<{ items: ActionSummary[] }> = ({ items }) => (
     <ul className="space-y-3">
        {items.map((item, index) => (
            <li key={index} className="pl-2 border-l-2 border-slate-600">
                <p className="font-semibold text-slate-200">{item.name}</p>
                <p className="text-slate-400">{item.description}</p>
            </li>
        ))}
    </ul>
);

export const TeachNoteDisplay: React.FC<TeachNoteDisplayProps> = ({ teachNote, isLoading, onUpdateNote, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState<TeachNote | null>(teachNote);

  useEffect(() => {
    setEditedNote(teachNote);
    if(isEditing) {
        setIsEditing(false);
    }
  }, [teachNote]);

  const handleSave = () => {
    if (editedNote) {
        onUpdateNote(editedNote);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
      setEditedNote(teachNote);
      setIsEditing(false);
  };

  const handleFieldChange = (field: keyof Omit<TeachNote, 'actions' | 'scoring' | 'otherConcepts'>, value: string) => {
    setEditedNote(prev => prev ? { ...prev, [field]: value } : null);
  };
  
  const handleListItemChange = (field: 'scoring' | 'otherConcepts', index: number, value: string) => {
    setEditedNote(prev => {
        if (!prev) return null;
        const list = prev[field] ? [...prev[field]] : [];
        list[index] = value;
        return { ...prev, [field]: list };
    });
  };

  const handleListItemDelete = (field: 'scoring' | 'otherConcepts', index: number) => {
     setEditedNote(prev => {
        if (!prev || !prev[field]) return null;
        const list = [...prev[field]!];
        list.splice(index, 1);
        return { ...prev, [field]: list };
    });
  };

  const handleListItemAdd = (field: 'scoring' | 'otherConcepts') => {
    setEditedNote(prev => {
        if (!prev) return null;
        const list = prev[field] ? [...prev[field]] : [];
        return { ...prev, [field]: [...list, 'New Item'] };
    });
  };

  const handleActionChange = (index: number, field: keyof ActionSummary, value: string) => {
      setEditedNote(prev => {
          if (!prev || !prev.actions) return null;
          const newActions = [...prev.actions];
          newActions[index] = {...newActions[index], [field]: value };
          return {...prev, actions: newActions};
      })
  }

  const handleActionDelete = (index: number) => {
      setEditedNote(prev => {
          if (!prev || !prev.actions) return null;
          const newActions = [...prev.actions];
          newActions.splice(index, 1);
          return {...prev, actions: newActions};
      })
  }

  const handleActionAdd = () => {
      setEditedNote(prev => {
          if (!prev || !prev.actions) return null;
          const newAction = { name: "New Action", description: "Description"};
          return {...prev, actions: [...prev.actions, newAction]};
      })
  }


  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!teachNote || !editedNote) {
    return (
      <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center text-slate-400 h-full flex items-center justify-center">
        <p>Your generated teach note will appear here.</p>
      </div>
    );
  }

  const inputClass = "w-full bg-slate-700/80 border border-slate-600 rounded-lg p-2 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition";
  const textareaClass = `${inputClass} min-h-[80px]`;
  
  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 shadow-lg animate-fade-in">
        <div className="relative mb-8">
            <div className="text-center">
                {isEditing ? (
                    <input type="text" value={editedNote.gameName} onChange={e => handleFieldChange('gameName', e.target.value)} className={`${inputClass} text-2xl font-bold mb-2 text-cyan-300 text-center bg-transparent border-slate-700`} />
                ) : (
                    <h2 className="text-2xl font-bold mb-2 text-cyan-300">{teachNote.gameName}</h2>
                )}
                <p className="text-slate-400 italic">A Quick Guide to Get You Started</p>
            </div>
            
            <div className="absolute top-0 right-0 flex items-center gap-2">
                {isEditing ? (
                    <>
                        <button onClick={handleSave} className="p-2 text-green-400 bg-green-500/10 rounded-full hover:bg-green-500/20"><CheckIcon className="w-5 h-5"/></button>
                        <button onClick={handleCancel} className="p-2 text-red-400 bg-red-500/10 rounded-full hover:bg-red-500/20"><XMarkIcon className="w-5 h-5"/></button>
                    </>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 rounded-full"><PencilIcon className="w-5 h-5"/></button>
                )}
            </div>
             {onSave && !isEditing && (
                <div className="mt-4 text-center">
                    <button onClick={onSave} className="inline-flex items-center gap-2 bg-cyan-600/20 text-cyan-300 border border-cyan-600/50 font-semibold py-2 px-4 rounded-lg hover:bg-cyan-600/40 hover:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-all duration-200">
                        <SaveIcon className="w-5 h-5" />
                        Save New Game
                    </button>
                </div>
            )}
        </div>

        <div className="space-y-6">
            <Section icon={<HashtagIcon />} title="Theme">
                {isEditing ? <textarea value={editedNote.theme} onChange={e => handleFieldChange('theme', e.target.value)} className={textareaClass} /> : <p>{teachNote.theme}</p>}
            </Section>
            <Section icon={<PuzzlePieceIcon />} title="Gameplay">
                {isEditing ? <textarea value={editedNote.gameplay} onChange={e => handleFieldChange('gameplay', e.target.value)} className={textareaClass} /> : <p>{teachNote.gameplay}</p>}
            </Section>
            <Section icon={<ArrowPathIcon />} title="Round Structure">
                {isEditing ? <textarea value={editedNote.roundStructure} onChange={e => handleFieldChange('roundStructure', e.target.value)} className={textareaClass} /> : <p>{teachNote.roundStructure}</p>}
            </Section>
            <Section icon={<ForwardIcon />} title="Player Turn">
                {isEditing ? <textarea value={editedNote.playerTurn} onChange={e => handleFieldChange('playerTurn', e.target.value)} className={textareaClass} /> : <p>{teachNote.playerTurn}</p>}
            </Section>
            
            <Section icon={<LightBulbIcon />} title="Key Actions" isEditing={isEditing} onAdd={handleActionAdd} addLabel="Add Action">
                {isEditing ? (
                    <div className="space-y-3">
                        {editedNote.actions?.map((action, index) => (
                           <div key={index} className="p-3 bg-slate-700/50 rounded-lg space-y-2 relative">
                               <input type="text" value={action.name} onChange={e => handleActionChange(index, 'name', e.target.value)} className={`${inputClass} font-semibold`} placeholder="Action Name"/>
                               <textarea value={action.description} onChange={e => handleActionChange(index, 'description', e.target.value)} className={textareaClass} placeholder="Action Description" />
                               <button onClick={() => handleActionDelete(index)} className="absolute top-2 right-2 p-1 text-slate-500 hover:text-red-400"><TrashIcon className="w-4 h-4"/></button>
                           </div>
                        ))}
                    </div>
                ) : teachNote.actions && teachNote.actions.length > 0 ? (
                    <ActionList items={teachNote.actions} />
                ) : <p className="text-slate-500">No actions defined.</p>}
            </Section>

            <Section icon={<CheckCircleIcon />} title="How the Game Ends">
                 {isEditing ? <textarea value={editedNote.endGame} onChange={e => handleFieldChange('endGame', e.target.value)} className={textareaClass} /> : <p>{teachNote.endGame}</p>}
            </Section>

            <Section icon={<TrophyIcon />} title="Scoring Recap" isEditing={isEditing} onAdd={() => handleListItemAdd('scoring')} addLabel="Add Scoring Rule">
                 {isEditing ? (
                    <div className="space-y-2">
                        {editedNote.scoring?.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input type="text" value={item} onChange={e => handleListItemChange('scoring', index, e.target.value)} className={inputClass}/>
                                <button onClick={() => handleListItemDelete('scoring', index)} className="p-2 text-slate-500 hover:text-red-400"><TrashIcon className="w-5 h-5"/></button>
                            </div>
                        ))}
                    </div>
                 ) : teachNote.scoring && teachNote.scoring.length > 0 ? (
                    <BulletList items={teachNote.scoring} />
                 ) : <p className="text-slate-500">No scoring rules defined.</p>}
            </Section>
            
            <Section icon={<ExclamationTriangleIcon />} title="Other Important Concepts" isEditing={isEditing} onAdd={() => handleListItemAdd('otherConcepts')} addLabel="Add Concept">
                {isEditing ? (
                    <div className="space-y-2">
                        {editedNote.otherConcepts?.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input type="text" value={item} onChange={e => handleListItemChange('otherConcepts', index, e.target.value)} className={inputClass}/>
                                <button onClick={() => handleListItemDelete('otherConcepts', index)} className="p-2 text-slate-500 hover:text-red-400"><TrashIcon className="w-5 h-5"/></button>
                            </div>
                        ))}
                    </div>
                 ) : teachNote.otherConcepts && teachNote.otherConcepts.length > 0 ? (
                    <BulletList items={teachNote.otherConcepts} />
                 ) : <p className="text-slate-500">No other concepts defined.</p>}
            </Section>
        </div>
    </div>
  );
};


const LoadingSkeleton: React.FC = () => (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 shadow-lg w-full">
        <div className="animate-pulse">
            <div className="h-8 bg-slate-700 rounded-md w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-slate-700 rounded-md w-1/2 mx-auto mb-8"></div>
            <div className="space-y-6">
                {[...Array(6)].map((_, i) => (
                    <div className="flex items-start gap-4" key={i}>
                        <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
                        <div className="flex-grow space-y-2">
                            <div className="h-5 bg-slate-700 rounded-md w-1/4"></div>
                            <div className="h-4 bg-slate-700 rounded-md w-full"></div>
                            <div className="h-4 bg-slate-700 rounded-md w-5/6"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
