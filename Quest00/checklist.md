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
<br><br>

## git의 Object, Commit, Head, Branch, Tag는 어떤 개념일까요? git 시스템은 프로젝트의 히스토리를 어떻게 저장할까요?
- __Object__
    - git이 데이터를 관리하기 위해 사용하는 객체다.
    - blob, tree, commit, tag로 구성되어있으며 ".git/objects"에 위치한다.
    - git의 내부는 key-value 데이터베이스이며, 데이터의 SHA1 해시값은 키값으로 저장한다.
    - 40자로 이루어진 SHA1 해시값의 앞 2자리를 디렉터리 명으로, 나머지 38자를 파일명으로 저장한다.

- __Commit__
    - Staging Area에 있는 데이터의 스냅샷에 대한 포인터와 메타데이터를 포함하는 객체다.
    - author, committer, commit Date, commit message, root tree object를 저장한다.
    - 이전 커밋에 대한 포인터를 저장하고 있기 때문에, 무엇을 기준으로 변경되었는지 알 수 있다.

- __Head__
    - 현재 작업중인 브랜치의 최종 커밋을 가리키는 포인터이다.
    - checkout 명령어를 사용해 Branch와 분리할 수 있다.

- __Branch__
    - 특정 커밋을 가리키는 포인터다.

- __Tag__
    - __Lightweight__
        - 특정 커밋에 대한 포인터이다.
            ```
            git tag v1.0 -lw
            git show v1.0 -lw 
            ```
    - __Annotated__
        - 특정 커밋에 대한 포인터, 작성자, 메시지, 작성일 GPG서명 등을로 담고있다.
            ```
            git tag -a v1.0 -m "태그 메시지"
            git show v1.0
            ```
    - git push는 태그를 원격 서버로 전송하지 않기 때문에 명시적으로 전송해야 한다.
        ```
        git push origin v1.0
        ```

- __History__
    - git 시스템은 스냅샷을 기반으로 히스토리를 관리한다.
    - 내부적으로는 commit 객체에 존재하는 포인터들로 상태를 관리한다.
        - tree: 현재 커밋의 파일 구조 표현
        - author: 처음에 코드를 짜고 Commit한 사람
        - committer: 가장 최근에 커밋을 수행한 사람
        - commit date: 커밋한 날짜
        - parent commit: 이전 커밋의 포인터로 스냅샷의 순서 파악
        ![Commit-Tree-Blob 관계](https://media.vlpt.us/images/kwonh/post/cecd0799-a0be-4f48-9763-9af46eee8054/%EC%BA%A1%EC%B2%98.JPG)


- __Tree__
    - 유닉스의 디렉터리에 대응하는 개념으로, git에 저장되는 object다.
    - blob들의 파일명, 형식, 크기, 접근권한, 어느 디렉터리에 속하는지의 정보를 기록한다.
    - 디렉터리 안에는 여러 파일이나 서브 디렉터리가 들어갈 수 있는 것과 마찬가지로 tree는 재귀적으로 존재할 수 있다.

- __Blob__ (Binary Large Object)
    - 파일의 바이너리 데이터 자체만 저장하며, 메타 데이터는 저장되지 않는다.
    - 만약 이름이 다르고 내용이 같은 2개의 파일이 프로젝트 내에 있다면, 한개의 blob만 저장한다.
<br><br><br><br>

## 리모트 git 저장소에 원하지 않는 파일이 올라갔을 때 이를 되돌리려면 어떻게 해야할까요?
- 일반적인 상황이라면 revert를 사용해 커밋을 되돌리고 push해 원격 저장소에 반영한다.
- 보안상에 문제가 되거나 내역을 남기면 안될 파일이라면 팀원과 상의 후 reset을 사용해 내역을 제거하고 force push한다.
    ```
    git log -g
    git reset <commit_id>
    git commit -m "새로운 커밋 메시지"
    git push origin <branch_name> -f
    
    reset은 force push가 강제되므로, 동기화 문제를 위해 팀원들과 상의를 꼭 해야한다.
    ```
<br><br>

## Mercurial은 어떤 형상관리 시스템일까요? 어떤 장점이 있을까요?
- git에 비해 낮은 러닝커브를 요구한다.
- git은 스냅샷 기반의 시스템이고, mercurial은 각 파일별 변경분만 추적하는 시스템이다.
- 저장소에는 파일의 변경 이력이 바이너리 형태로 저장되어 있는 .i 확장자를 가진 변경 기록용 파일이 있다.
- 장점
    - 저장소에 대한 관리 작업이 필요하지 않다는 장점이 있다.
    - 스냅샷 기반인 git에 비해 디스크 I/O가 적으므로, 대량의 읽기/쓰기가 발생하는 상황에서도 비교적 안정적이다.
    - 대신 패치의 성능이나 변경 이력의 추적에는 Git에 비해 용이하나, 커밋 작업의 경우 높은 비용을 요구한다.
<br><br><br>

## 실리콘밸리의 테크 대기업들은 어떤 형상관리 시스템을 쓰고 있을까요?
- __git__: Google, Facebook, Microsoft, Netfilx, Twitter 등
- __mercurial__: Facebook, NginxMozilla Corporation, bitbucket 등
- __Subversion__: Linkedin 등
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
