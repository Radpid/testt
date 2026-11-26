#!/bin/sh
# Sauvegarde d'un épisode pendant un long travail à plusieurs : un seul commit à la fois (verrou), puis envoi.
#   tools/sauvegarde.sh videos/<episode> "message court"
# N'ajoute QUE le dossier de l'épisode (out/, la voix et la photo de l'auteur restent hors de git : .gitignore).
ep="$1"; msg="$2"
[ -d "$ep" ] && [ -n "$msg" ] || { echo "usage : tools/sauvegarde.sh videos/<episode> \"message court\""; exit 1; }
root=$(git rev-parse --show-toplevel) || exit 1
branch=claude/awesome-shannon-2sa9g5
(
  flock -w 600 9 || { echo "verrou occupé : sauvegarde non faite"; exit 1; }
  [ "$(git rev-parse --abbrev-ref HEAD)" = "$branch" ] || { echo "mauvaise branche : sauvegarde non faite"; exit 1; }
  git add -- "$ep" || exit 1
  if git diff --cached --quiet -- "$ep"; then echo "rien à sauvegarder"; exit 0; fi
  git commit -q -m "$msg

Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HH9xbJq9LK2mdwuvKd7BsG" -- "$ep" || exit 1
  for i in 1 2 3 4; do
    git push -q -u origin "$branch" 2>/dev/null && { echo "sauvegardé : $(git log -1 --format=%h) $msg"; exit 0; }
    sleep $((i * 4))
  done
  echo "commit fait, envoi échoué (sera renvoyé à la prochaine sauvegarde)"
) 9>"$root/.git/sauvegarde.lock"
