import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { addXP, completeQuest } from '../../store/learnerSlice';
import { addToast } from '../../store/uiSlice';
import { QUEST_SCENARIOS } from '../../data/curriculumData';

export const MoneyQuestGame: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeChild, completedQuests } = useAppSelector((state) => state.learner);

  const [currentQuestIndex, setCurrentQuestIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [outcomeRevealed, setOutcomeRevealed] = useState(false);

  const currentQuest = QUEST_SCENARIOS[currentQuestIndex];
  const isCompleted = completedQuests.includes(currentQuest?.id);

  const handleSelectChoice = (choiceId: string) => {
    if (outcomeRevealed) return;
    setSelectedChoiceId(choiceId);
  };

  const handleConfirmDecision = () => {
    if (!selectedChoiceId) return;
    const choice = currentQuest.choices.find((c) => c.id === selectedChoiceId);
    if (!choice) return;

    setOutcomeRevealed(true);
    dispatch(completeQuest({ questId: currentQuest.id, xpEarned: choice.xp }));
    dispatch(
      addToast({
        title: `+${choice.xp} XP Earned!`,
        message: `Stewardship choice evaluated: "${choice.moralTag}"`,
        type: 'success',
      })
    );
  };

  const handleNextQuest = () => {
    setSelectedChoiceId(null);
    setOutcomeRevealed(false);
    setCurrentQuestIndex((prev) => (prev + 1) % QUEST_SCENARIOS.length);
  };

  return (
    <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-xl border border-surface-container">
      {/* Game Header */}
      <div className="flex items-center justify-between border-b border-surface-container pb-5 mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-extrabold shadow-md">
            <span className="material-symbols-outlined text-[28px]">sports_esports</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-xs uppercase font-extrabold text-secondary tracking-wider">
                TATI Money Quest Simulator
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold">
                Round {currentQuest.round} of 12
              </span>
            </div>
            <h2 className="font-headline-sm text-lg sm:text-xl font-extrabold text-on-surface">
              {currentQuest.title}
            </h2>
          </div>
        </div>

        {/* Player Status */}
        <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-2xl border border-surface-container">
          <div className="text-right">
            <p className="text-xs font-bold text-on-surface">{activeChild.name}</p>
            <p className="text-[11px] text-primary font-semibold">
              Level {activeChild.level} • {activeChild.xp} XP
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
            {activeChild.avatar || '🇬🇭'}
          </div>
        </div>
      </div>

      {/* Quest Situation Box */}
      <div className="bg-gradient-to-r from-primary-fixed/20 to-secondary-fixed/20 p-5 rounded-2xl border border-primary/20 mb-6">
        <div className="flex items-center gap-2 text-primary font-label-caps text-xs uppercase font-bold mb-2">
          <span className="material-symbols-outlined text-[18px]">announcement</span>
          <span>Dilemma Scenario</span>
        </div>
        <p className="font-body-lg text-sm sm:text-base text-on-surface font-medium leading-relaxed">
          "{currentQuest.situation}"
        </p>
        <p className="font-title-md text-sm text-primary font-bold mt-3">
          Question: {currentQuest.question}
        </p>
      </div>

      {/* Choices Grid */}
      <div className="space-y-3 mb-6">
        <span className="font-label-caps text-xs uppercase text-outline block font-bold">
          Choose Your Action:
        </span>
        {currentQuest.choices.map((choice) => {
          const isSelected = selectedChoiceId === choice.id;
          return (
            <div
              key={choice.id}
              onClick={() => handleSelectChoice(choice.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'border-primary bg-primary-fixed/20 ring-2 ring-primary shadow-sm'
                  : 'border-surface-container bg-surface-container-low hover:border-outline'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                    isSelected ? 'border-primary bg-primary text-white' : 'border-outline'
                  }`}
                >
                  {isSelected && <span className="material-symbols-outlined text-[16px]">check</span>}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-body-md text-sm font-semibold text-on-surface">
                      {choice.label}
                    </span>
                    <span className="font-label-caps text-[11px] bg-surface-container-highest px-2 py-0.5 rounded text-on-surface font-bold">
                      +{choice.xp} XP
                    </span>
                  </div>

                  {/* Outcome display if revealed */}
                  {outcomeRevealed && isSelected && (
                    <div className="mt-3 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-surface-container animate-fadeIn">
                      <span className="font-label-caps text-[11px] text-secondary font-bold uppercase block mb-1">
                        Consequence Evaluated ({choice.moralTag}):
                      </span>
                      <p className="font-body-sm text-xs text-on-surface leading-relaxed">
                        {choice.consequence}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stewardship Lesson Footer */}
      <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container mb-6 flex items-start gap-3">
        <span className="material-symbols-outlined text-secondary text-[22px] shrink-0 mt-0.5">
          lightbulb
        </span>
        <div className="text-xs">
          <span className="font-bold text-on-surface block">Stewardship Core Lesson:</span>
          <span className="text-on-surface-variant">{currentQuest.stewardshipLesson}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => {
            setSelectedChoiceId(null);
            setOutcomeRevealed(false);
          }}
          className="text-xs font-semibold text-on-surface-variant hover:text-on-surface"
        >
          Reset Choice
        </button>

        {!outcomeRevealed ? (
          <button
            type="button"
            onClick={handleConfirmDecision}
            disabled={!selectedChoiceId}
            className="px-6 py-3 rounded-xl bg-primary-container text-on-primary font-bold text-xs sm:text-sm shadow-md hover:bg-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span>Lock In Decision</span>
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNextQuest}
            className="px-6 py-3 rounded-xl bg-secondary-container text-on-secondary-fixed font-bold text-xs sm:text-sm shadow-md hover:bg-amber-400 transition-all flex items-center gap-2"
          >
            <span>Next Quest Dilemma</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        )}
      </div>
    </div>
  );
};
