# Quest 00. 형상관리 시스템
## 형상관리 시스템은 왜 나오게 되었을까요?
- 소프트웨어의 변경사항을 체계적으로 추적하고 통제하기 위해 개발되었다.
- 이를 통해 전체 비용을 감소시키고 리스크 요인들을 최소화 하는것을 목표로 한다.
<br><br><br>

## git은 어떤 형상관리 시스템이고 어떤 특징을 가지고 있을까요? 분산형 형상관리 시스템이란 무엇일까요?
- Git은 분산 버전 제어 시스템(DVCS)으로, 다음과 같은 특징이 있다.
     - 빠른 속도
     - 단순한 구조
     - 비 선형적인 개발 (브랜치를 이용한 개발)
     - 완벽한 분산
     - 속도나 데이터 크기 면에서, Linux 커널같은 대형 프로젝트에도 유용할 것
     - 분산형 형상관리 시스템은 각 개발자가 중앙 서버에 접속하지 않은 상태에서도 코드를 작업할 수 있는 환경을 제공한다.
<br><br><br>

- git은 어떻게 개발하게 되었을까요? git이 분산형 시스템은 채택한 이유는 무엇일까요?
    - Linux 커널을 개발하는 커뮤니티가 BitKeeper라는 DVCS를 사용하던 중, BitKeeper의 무료 사용이 재고되면서 개발사와 커뮤니티의 관계가 틀어졌다. 이러한 계기로, Git이라는 자체 도구를 개발하게 되었다.
    - 분산형 시스템을 채택한 이유는 위의 특징과 백업에 대한 이점, 중앙집중식 시스템으로는 할 수 없는 워크플로우를 사용하기 위함이다.
<br><br><br>

## git과 GitHub는 어떻게 다를까요?
- git은 DVCS 이고, GitHub는 다양한 기능을 통해 생산성을 높일 수 있는 기능들을 제공하는 Git 호스팅 저장소다.
    - 원격 저장소에서의 활동 시각화
    - issue
    - pr을 통한 code riview
<br><br><br>

## git의 clone/ add/ commit/ push/ pull/ branch/ stash 명령은 무엇이며 어떨 때 이용하나요? 그리고 어떻게 사용하나요?
- __clone__: 이미 원격에 존재하는 프로젝트의 로컬 사본을 만들고, 복제본에는 모든 프로젝트의 파일, 기록 및 분기가 포함된다.
    ```
    git clone <git_path>
    ```

- __add__: 코드베이스에 대한 변경 사항을 추적해 프로젝트 기록에 포함하기 위해 스테이징을 수행한다. 스테이징 된 모든 변경 사항은 다음 스냅 샷(commit)의 일부가 되고 프로젝트 기록의 일부가 된다.
    ```
    git add <file_path>
    ```

- __commit__: 스냅 샷을 프로젝트 기록에 저장하고 변경, 추적 프로세스를 완료한다. 각 커밋은 저장소의 이전 버전과 다음 버전의 변경내역(delta)을 저장한다.
    ```
    git commit -m <commit_description>
    ```

- __push__: 분기에 로컬로 만든 커밋으로 원격 저장소를 업데이트 한다.
    - 콜론 참조스펙을 이용해 source와 destination을 모두 지정할 수 있다. (참조스펙은 git이 알아낼 수 있는 위치를 의미함)
        - ex) git push origin foo:main
    ```
    git push <remote_name> <branch_name>
    ```

- __pull__: 원격 저장소의 업데이트로 로컬 저장소를 업데이트 한다. 팀원이 원격 저장소에 커밋을 수행하고 변경사항이 반영되면 pull을 이용해 싱크를 맞춘다.
    - 내부적으로는 fetch + merge의 작업을 한다.
    - git pull --rebase를 통해 rebase와 함께 사용할 수 있다.
    ```
    git pull <remote_name> <branch_name>
    ```

- __branch__: 브랜치를 관리하는 명령어다.
    ```
    git branch <branch_name> : 브랜치 생성하기
    git branch -r : 원격 브랜치 목록보기
    git branch -a : 로컬 브랜치 목록보기
    git branch -m <branch_name> <change_branch_name> : 브랜치 이름 바꾸기
    git branch -d <branch_name> : 브랜치 삭제하기
    ```

- __stash__: 현재 브랜치에서 작업중인 내용을 스택에 잠시 저장해놓는 명령어다.
    ```
    git stash : 작업중이던 코드 임시저장
    git stash list : stash 내역 출력
    git stash pop : 마지막으로 임시저장한 코드 가져오기
    git stash save <stash_description>: 설명과 함께 저장
    git stash drop <stash_id> : list 옵션을 조회한 stash 내역 제거
    ```
<br><br><br>

## git의 Object, Commit, Head, Branch, Tag는 어떤 개념일까요? git 시스템은 프로젝트의 히스토리를 어떻게 저장할까요?
- __Object__
    - git이 데이터를 관리하기 위해 사용하는 객체다.
    - 아래 4종류로 구성되어있으며 ".git/objects"에 위치한다.
        - blob, tree, commit, tag
- __Commit__
    - git commit할 때 생성된다.
    - commit history를 저장하는 Object다.
    - author, committer, commit Date, commit message를 저장한다.
    - 해당 커밋의 root tree object와 parent commit object의 정보를 저장한다.
- __Head__
    - 현재 브랜치나 특정 커밋에 대한 참조가 있다.
    - HEAD 분리를 통해 브랜치 대신에 커밋에 붙일 수 있다.
- __Branch__
    - 작업 내역의 모음. 브랜치는 특정 커밋에 대한 참조이기 때문에 가볍고 빠르다.
- __Tag__
    - 특정 commit이 중요하다고 생각하면 주석과 함께 tagging을 할 수 있다.
    - 특정 commit에 tag를 달면 tag object가 생성된다.
    - git push은 태그를 원격 서버로 전송하지 않기 때문에 명시적으로 전송해야 한다.
        - ex) git push origin tagname
- __Tree__
    - 유닉스의 디렉토리에 대응하는 개념으로, git에 저장되는 object다.
    - 파일명, 형식, 크기, 접근권한, 어느 디렉터리에 속하는지 등의 정보를 기록한다.
- __Blob__
    - 파일의 이름이나 형식등은 저장되지 않고 바이너리 데이터 자체만 저장하며, SHA1해시값 40글자로 구성되어있다.
    - 만약 이름이 다르고 내용이 같은 2개의 파일이 프로젝트 내에 있다면, 한개의 blob만 저장한다.
<br><br><br>


## 리모트 git 저장소에 원하지 않는 파일이 올라갔을 때 이를 되돌리려면 어떻게 해야할까요?
- reset과 revert를 사용하여 되돌릴 수 있다.
- reset의 경우, 히스토리를 고쳐쓰는 개념이기 때문에 다른 사람이 작업하는 리모트 브랜치에는 쓸 수 없다. 따라서, 변경분을 되돌리고, 이 되돌린 내용을 다른 사람들과 공유하기 위해서는, revert를 사용해야 한다.
<br><br><br><br>



# 아래는 Learn Git Branching 을 진행하며 노트한 내용입니다.
- 커밋 메시지 수정하기
     ```
     1. git rebase -i
     2. 수정하고자 하는 commit의 상태를 pick -> edit으로 변경
     3. git commit --amend 명령으로 커밋 내용 정정
     4. git rebase -continue 명령으로 리베이스 완료
     ```
<br>

- 브랜치 생성: git branch ["브랜치 네임"]
    - -f 옵션을 사용해서 브랜치의 Startpoint를 특정 커밋에 직접적으로 재지정 할 수 있다.
        - ex) git branch -f main HEAD-3
    - 원격 추적 설정: git branch -u origin/main foo => 로컬 foo branch가 원격의 main branch를 추적함 
<br><br>

- 브랜치 변경: git checkout ["브랜치 네임"]
    - 원격 추적 설정: git checkout -b foo origin/main => 원격 main branch를 새로 생성한 foo branch가 추적함 
- 상대 참조: 커밋 간 이동할 때 해시를 이용하는 방법과 더불어 제공하는 이동 방법으로, 기억할 만한 
지점에서 출발하여 다른 지점으로 도착할 수 있다.
    - 한번에 한 커밋 위로 올라가는 ^
    - 한번에 여러 커밋 위로 올라가는 ~num
<br><br>

- reset: git reset HEAD^
- revert: git revert ["커밋 해시"]
- cherry-pick: git cherry-pick ["커밋 해시"] ["커밋 해시"] ["커밋 해시"]
- interactive rebase: rebase를 사용할 때 -i 옵션을 함께 사용하는 것
- tag: 프로젝트의 작업 이력에서 중요한 지점들에 영구적으로 표시하는 방법
    -> git tag [태그 명] [커밋 명 or 생략 시 HEAD]
- describe: 커밋에 설명 추가 -> disect명령어에 도움이 된다
    -> git describe <ref>
        => 명령어의 출력은 다음과 같은 형태로 나타난다.
        => <tag>_<numCommits>_g<hash>
        => tag는 가장 가까운 부모 태르는 나타낸다.
        => numCommits은 그태그가 몇 커밋 멀리있는지를 나타낸다.
        => hash는 묘사하고 있는 커밋의 해시를 나타난다.

- merge: 브랜치를 병합하기 위해 두 개의 부모가있는 특별한 커밋을 생성한다. (모든 부모의 작업내역을 포함함)
- rebase: 커밋들을 모아서 복사한 뒤, 다른 곳에 떨궈 놓는 것이다. (커밋을의 흐름을 보기 좋게 한 줄로 만들 수 있음)
- amend: 커밋 메시지를 정정한다.
- fetch: 원격 저장소에서 데이터를 가져온다.
    1. 원격 저장소에는 있지만 로컬에는 없는 커밋들을 다운로드 받는다.
    2. 원격 브랜치가 가리키는 곳을 업데이트 한다.
        - 실제로 로컬 파일들이나 브랜치를 변경하지는 않는다.
